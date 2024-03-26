import { PropsWithChildren, ReactNode, useLayoutEffect, useState } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import {
    Button,
    Chip,
    Divider,
    Link,
    Spacer,
    Spinner,
} from '@nextui-org/react';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { LuArrowLeft, LuPackage } from 'react-icons/lu';
import clsx from 'clsx';
import { lazily } from 'react-lazily';
import { widgetDeliveryStatusUi } from '@/widgets/deliveries/deliveryStatus';
import { SubwayStationWithIcon } from '@/shared/services/subway';
import { useTranslation } from 'react-i18next';
import { ClientContactCardList } from '@/entities/client';
import { IoCar, IoPersonSharp } from 'react-icons/io5';
import { MdOutlineDirectionsRun } from 'react-icons/md';
import { HiLightningBolt } from 'react-icons/hi';
import { RiBuildingFill, RiWifiOffLine } from 'react-icons/ri';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { LatLngLiteral } from 'leaflet';
import { PageState } from '@/pages/deliveries/singleDeliveryDetailsPage/types';
import { useNetworkInfo } from '@/shared/config/network';

import { FaMinus, FaPlus } from 'react-icons/fa6';
import {
    $$deliveryAddress,
    $$deliveryClientName,
    $$deliveryClientType,
    $$deliveryClientTypeLocaled,
    $$deliveryContact,
    $$deliveryContents,
    $$deliveryCoordinates,
    $$deliveryCourier,
    $$deliveryId,
    $$deliveryIsExpress,
    $$deliveryIsExpressTranslated,
    $$deliveryManager,
    $$deliveryMetro,
    $$deliveryPickupDateTime,
    $$deliveryType,
    $$deliveryTypeTranslated,
    $$deliveryWeight,
    $$isViewerDelivery,
    $pageContentState,
} from '../../model';
import {
    LABEL_ADDRESS,
    LABEL_CLIENT,
    LABEL_CLIENT_TYPE,
    LABEL_CONTACT_PERSON,
    LABEL_CONTENTS,
    LABEL_COURIER,
    LABEL_DELIVERY_STATUS,
    LABEL_EXPRESS,
    LABEL_ID,
    LABEL_MANAGER,
    LABEL_METRO,
    LABEL_MY_DELIVERY,
    LABEL_PICKUP,
    LABEL_TYPE,
    LABEL_WEIGHT,
    translationNS,
} from '../../config';
import { generateYandexMapsLink } from '../../lib';
import { Loading, NotFound } from './common/states';

const { UserCardRow } = lazily(() => import('@/entities/user'));
const { NavbarMobile } = widgetNavbarMobileUi;
const { DeliveryStatusControlWithTimeline } = widgetDeliveryStatusUi;

/**
 * Layout
 */
const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="relative h-full w-full flex-col lg:mx-auto lg:w-[750px]">
        {children}
    </main>
);

interface ISectionProperties {
    children: ReactNode | ReactNode[];
    className?: string;
    padding?: 'default' | 'none';
}

const Section: FunctionComponent<ISectionProperties> = ({
    children,
    padding = 'default',
    className,
}) =>
    padding === 'default' ? (
        <section className={`w-full px-4 ${className}`}>{children}</section>
    ) : (
        <section className={`w-full ${className}`}>{children}</section>
    );

/**
 * Components
 */

const Heading: FunctionComponent<{ content: string }> = ({ content }) => {
    return <h3 className="font-bold">{content}</h3>;
};
const Client: FunctionComponent = () => {
    const name = useUnit($$deliveryClientName);
    return <p>{name}</p>;
};
const ClientType: FunctionComponent = () => {
    const type = useUnit($$deliveryClientType);
    const text = useUnit($$deliveryClientTypeLocaled);
    if (type === 'organization') {
        return (
            <div className="flex items-center gap-1">
                <span className="text-xl">
                    <RiBuildingFill />
                </span>
                {text}
            </div>
        );
    }
    return (
        <div className="flex items-center gap-1">
            <span className="text-xl">
                <IoPersonSharp />
            </span>
            {text}
        </div>
    );
};

const DeliveryId: FunctionComponent = () => {
    const id = useUnit($$deliveryId);
    return <p>{id}</p>;
};
const DeliveryPickup: FunctionComponent = () => {
    const pickup = useUnit($$deliveryPickupDateTime);
    return <p>{pickup}</p>;
};
const DeliveryTypeTransport: FunctionComponent = () => {
    const type = useUnit($$deliveryType);
    const text = useUnit($$deliveryTypeTranslated);

    if (type === 'car') {
        return (
            <div className="flex items-center gap-1">
                <span className="text-xl">
                    <IoCar />
                </span>
                {text}
            </div>
        );
    }
    return (
        <div className="flex items-center gap-1">
            <span className="text-xl">
                <MdOutlineDirectionsRun />
            </span>
            {text}
        </div>
    );
};
const DeliveryTypeExpress: FunctionComponent = () => {
    const express = useUnit($$deliveryIsExpressTranslated);
    const isExpress = useUnit($$deliveryIsExpress);

    return (
        <div className="flex items-center gap-1">
            {isExpress ? (
                <span className="text-xl text-secondary">
                    <HiLightningBolt />
                </span>
            ) : null}
            {express}
        </div>
    );
};
const DeliveryAddress: FunctionComponent = () => {
    const address = useUnit($$deliveryAddress);
    return (
        <div>
            <p>{address}</p>
            <Spacer y={0.5} />
            <Link
                href={generateYandexMapsLink(address)}
                as={Link}
                color="primary"
                size="sm"
            >
                Перейти на Яндекс.Карты
            </Link>
        </div>
    );
};
const DeliveryAddressSubway: FunctionComponent = () => {
    const metro = useUnit($$deliveryMetro);
    return <SubwayStationWithIcon value={metro} />;
};
const DeliveryContents: FunctionComponent = () => {
    const contents = useUnit($$deliveryContents);
    return <p>{contents}</p>;
};
const DeliveryWeight: FunctionComponent = () => {
    const weight = useUnit($$deliveryWeight);
    return <p>{weight}</p>;
};
const DeliveryCourier: FunctionComponent = () => {
    const courier = useUnit($$deliveryCourier);

    if (!courier)
        return (
            <div className="h-12 py-2">У доставки нет назначенного курьера</div>
        );

    return <UserCardRow account={courier} />;
};

const MyDeliveryChip: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const isMyDelivery = useUnit($$isViewerDelivery);
    return isMyDelivery ? (
        <Chip color="warning" size="sm">
            {children}
        </Chip>
    ) : null;
};
const DeliveryManager: FunctionComponent = () => {
    const manager = useUnit($$deliveryManager);

    if (!manager)
        return (
            <div className="h-12 py-2">
                У доставки нет назначенного менеджера
            </div>
        );
    return <UserCardRow account={manager} />;
};
const DeliveryContactPerson: FunctionComponent = () => {
    const contact = useUnit($$deliveryContact);
    return <ClientContactCardList contact={contact} />;
};

const BackButton: FunctionComponent = () => {
    const navigate = useNavigate();

    const onClick = (): void => {
        navigate(-1);
    };

    return (
        <Button isIconOnly color="default" aria-label="Like" onPress={onClick}>
            <LuArrowLeft />
        </Button>
    );
};

const Header: FunctionComponent<{
    backButton?: ReactNode;
    className?: string;
}> = ({ backButton, className }) => {
    const deliveryId = useUnit($$deliveryId);
    return (
        <header
            className={clsx(
                'absolute top-4 z-[1100] flex w-full items-center justify-between px-4',
                className,
            )}
        >
            {backButton}
            <h1
                className={clsx(
                    'text-xl font-semibold text-content1-foreground dark:text-content1',
                )}
            >
                {deliveryId || '0'}
            </h1>
            <div className="w-8" />
        </header>
    );
};

const MapControls: FunctionComponent<{
    marker?: LatLngLiteral;
}> = ({ marker }) => {
    const map = useMap();
    const onClickReturnToTarget = (): void => {
        map.flyTo(marker || [51.505, -0.09], 16);
    };

    const onClickZoomIn = (): void => {
        map.zoomIn();
    };

    const onClickZoomOut = (): void => {
        map.zoomOut();
    };

    return (
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <Button
                className="z-[6000] rounded-2xl"
                onPress={onClickReturnToTarget}
                isIconOnly
            >
                <LuPackage />
            </Button>
            <Button
                color="primary"
                variant="flat"
                className="z-[6000] rounded-2xl"
                onPress={onClickZoomIn}
                isIconOnly
            >
                <FaPlus />
            </Button>
            <Button
                color="primary"
                variant="flat"
                className="z-[6000] rounded-2xl"
                onPress={onClickZoomOut}
                isIconOnly
            >
                <FaMinus />
            </Button>
        </div>
    );
};

const OSMMap: FunctionComponent<{
    marker?: LatLngLiteral;
}> = ({ marker }) => {
    const [unmountMap, setUnmountMap] = useState<boolean>(false);

    useLayoutEffect(() => {
        setUnmountMap(false);
        return () => {
            setUnmountMap(true);
        };
    }, []);

    if (unmountMap) {
        return (
            <div className="relative h-[50vh] w-full">
                <div className="flex h-full w-full items-center justify-center">
                    <Spinner color="default" />
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-[50vh] w-full">
            <MapContainer
                center={marker || [51.505, -0.09]}
                zoom={16}
                scrollWheelZoom={false}
                className="h-[50vh] w-full"
                zoomControl={false}
                attributionControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={marker || [51.505, -0.09]} />
                <MapControls marker={marker} />
            </MapContainer>
        </div>
    );
};
const YMAPSFallback: FunctionComponent = () => {
    const address = useUnit($$deliveryAddress);
    const mapsQueryLink = generateYandexMapsLink(address);
    return (
        <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-6 bg-content1">
            <div className="text-center">
                <p className="text-2xl">Извините</p>
                <p className="text-xs font-light">
                    Для этой доставки карта недоступна
                </p>
            </div>
            <Button
                href={mapsQueryLink}
                as={Link}
                color="primary"
                className="rounded-md"
                showAnchorIcon
                size="sm"
            >
                Открыть Яндекс.Карты
            </Button>
        </div>
    );
};

const BlockWhenOffline: FunctionComponent<{
    children: ReactNode;
    online?: boolean;
}> = ({ children, online }) => {
    return online ? (
        children
    ) : (
        <div className="relative block">
            <div className="absolute bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-background opacity-85">
                <div className="text-center">
                    <Spacer y={4} />
                    <RiWifiOffLine className="mx-auto text-5xl text-danger" />
                    <Spacer y={4} />
                    <span className="text-content3  text-danger">
                        Недоступно офлайн
                    </span>
                </div>
            </div>
            {children}
        </div>
    );
};

export const MobileDeliveryDetailsPageView: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const { online } = useNetworkInfo();
    const [coordinates] = useUnit([$$deliveryCoordinates]);
    const [pageState] = useUnit([$pageContentState]);
    const isMapReady = coordinates && online;

    console.log(pageState);

    if (!pageState)
        return (
            <>
                <Header backButton={<BackButton />} />
                <Loading />
                <NavbarMobile />
            </>
        );

    if (pageState === PageState.NOT_LOADED)
        return (
            <div className="flex h-full w-full items-center justify-center">
                <MainContainer>
                    not loaded
                    <NavbarMobile />
                </MainContainer>
            </div>
        );
    if (pageState === PageState.NotFound) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <MainContainer>
                    <NotFound />
                    <NavbarMobile />
                </MainContainer>
            </div>
        );
    }
    if (pageState === PageState.Error) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <MainContainer>
                    err
                    <NavbarMobile />
                </MainContainer>
            </div>
        );
    }
    return (
        <>
            <Header className="z-[2000]" backButton={<BackButton />} />
            <MainContainer>
                {isMapReady ? (
                    <OSMMap marker={coordinates} />
                ) : (
                    <YMAPSFallback />
                )}
                <Spacer y={4} />
                <Section>
                    <div className="flex gap-2">
                        <Heading content={t(LABEL_ID)} />
                        <DeliveryId />
                    </div>
                </Section>
                <Spacer y={4} />
                <Divider className="px-2" />
                <Spacer y={4} />
                <Section>
                    <Heading content={t(LABEL_CLIENT)} />
                    <Client />
                </Section>
                <Spacer y={4} />
                <Section>
                    <Heading content={t(LABEL_CLIENT_TYPE)} />
                    <ClientType />
                </Section>
                <Spacer y={4} />
                <Section>
                    <Heading content={t(LABEL_PICKUP)} />
                    <DeliveryPickup />
                </Section>
                <Spacer y={4} />
                <Section>
                    <div className="flex gap-4">
                        <div className="flex-grow">
                            <Heading content={t(LABEL_TYPE)} />
                            <DeliveryTypeTransport />
                        </div>
                        <div className="flex-grow">
                            <Heading content={t(LABEL_EXPRESS)} />
                            <DeliveryTypeExpress />
                        </div>
                    </div>
                </Section>
                <Spacer y={4} />
                <Section>
                    <Heading content={t(LABEL_ADDRESS)} />
                    <DeliveryAddress />
                </Section>
                <Spacer y={4} />
                <Section>
                    <Heading content={t(LABEL_METRO)} />
                    <DeliveryAddressSubway />
                </Section>
                <Spacer y={4} />
                <Section>
                    <Heading content={t(LABEL_CONTENTS)} />
                    <DeliveryContents />
                </Section>
                <Spacer y={4} />
                <Section>
                    <Heading content={t(LABEL_WEIGHT)} />
                    <DeliveryWeight />
                </Section>
                <Spacer y={4} />
                <Divider className="px-2" />
                <Spacer y={4} />
                <Section>
                    <Heading content={t(LABEL_CONTACT_PERSON)} />
                    <Spacer y={4} />
                    <DeliveryContactPerson />
                </Section>
                <Spacer y={4} />
                <Divider className="px-2" />
                <Spacer y={4} />
                <Section>
                    <div className="flex items-center">
                        <div className="flex-grow">
                            <Heading content={t(LABEL_COURIER)} />
                        </div>
                        <div>
                            <MyDeliveryChip>
                                {t(LABEL_MY_DELIVERY)}
                            </MyDeliveryChip>
                        </div>
                    </div>
                    <Spacer y={2} />
                    <DeliveryCourier />
                </Section>
                <Spacer y={4} />
                <Divider className="px-2" />
                <Spacer y={4} />
                <Section>
                    <Heading content={t(LABEL_DELIVERY_STATUS)} />
                    <Spacer y={4} />
                    <BlockWhenOffline online={online}>
                        <DeliveryStatusControlWithTimeline />
                    </BlockWhenOffline>
                </Section>
                <Spacer y={4} />
                <Divider className="px-2" />
                <Spacer y={4} />
                <Section>
                    <Heading content={t(LABEL_MANAGER)} />
                    <Spacer y={2} />
                    <DeliveryManager />
                </Section>
                <Spacer y={4} />
            </MainContainer>
            <Spacer y={20} />
            <NavbarMobile />
        </>
    );
};
