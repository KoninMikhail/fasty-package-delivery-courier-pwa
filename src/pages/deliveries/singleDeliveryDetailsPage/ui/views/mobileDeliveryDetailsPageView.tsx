import { PropsWithChildren, ReactNode } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { Button, Chip, Divider, Link, Spacer } from '@nextui-org/react';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { LuArrowLeft } from 'react-icons/lu';
import clsx from 'clsx';
import { Route } from '@/entities/route';
import { lazily } from 'react-lazily';
import { widgetDeliveryStatusUi } from '@/widgets/deliveries/deliveryStatus';
import { SubwayStationWithIcon } from '@/shared/services/subway';
import { useTranslation } from 'react-i18next';
import { ClientContactCardList } from '@/entities/client';
import { IoCar, IoPersonSharp } from 'react-icons/io5';
import { MdOutlineDirectionsRun } from 'react-icons/md';
import { HiLightningBolt } from 'react-icons/hi';
import { RiBuildingFill } from 'react-icons/ri';
import {
    $$deliveryAddress,
    $$deliveryClientName,
    $$deliveryClientType,
    $$deliveryClientTypeLocaled,
    $$deliveryContact,
    $$deliveryContents,
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
    $$hasError,
    $$isDeliveryNotCoordinated,
    $$isViewerDelivery,
    $$notFound,
    mapModel,
} from '../../model';
import { NotFound } from './common';
import { translationNS } from '../../config';
import { generateYandexMapsLink } from '../../lib';

const { UserCardRow } = lazily(() => import('@/entities/user'));
const { NavbarMobile } = widgetNavbarMobileUi;
const { DeliveryStatusControlWithTimeline } = widgetDeliveryStatusUi;

const TRANSLATION = {
    LABEL_CLIENT: 'page.section.label.client',
    LABEL_CLIENT_TYPE: 'page.section.label.client.type',
    LABEL_PICKUP: 'page.section.label.pickup',
    LABEL_TYPE: 'page.section.label.type',
    LABEL_EXPRESS: 'page.section.label.express',
    LABEL_ADDRESS: 'page.section.label.address',
    LABEL_METRO: 'page.section.label.metro',
    LABEL_CONTENTS: 'page.section.label.contents',
    LABEL_WEIGHT: 'page.section.label.weight',
    LABEL_CONTACT_PERSON: 'page.section.label.contactPerson',
    LABEL_MANAGER: 'page.section.label.manager',
    LABEL_COURIER: 'page.section.label.courier',
    LABEL_DELIVERY_STATUS: 'page.section.label.deliveryStatus',
    LABEL_MY_DELIVERY: 'page.section.label.courier.chip.my',
    LABEL_ID: 'page.section.label.id',
};

/**
 * Layout
 */
const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col lg:mx-auto lg:w-[750px]">
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
    return courier ? <UserCardRow account={courier} /> : null;
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
    backButton: ReactNode;
    className?: string;
}> = ({ backButton, className }) => {
    const fallback = useUnit($$isDeliveryNotCoordinated);
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
                {deliveryId}
            </h1>
            <div className="w-8" />
        </header>
    );
};

const Map: FunctionComponent = () => {
    const hasCoordinates = useUnit($$isDeliveryNotCoordinated);
    const address = useUnit($$deliveryAddress);
    const mapsQueryLink = generateYandexMapsLink(address);
    console.log(hasCoordinates);
    return (
        <div className="relative h-[50vh] w-full">
            {hasCoordinates ? (
                <div className="absolute bottom-0 left-0 right-0 top-0 z-[1050] flex h-full w-full flex-col items-center justify-center gap-6 bg-content1 bg-opacity-85">
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
            ) : null}
            <Route.Map.Container className="h-[50vh] w-full" model={mapModel} />
        </div>
    );
};

export const MobileDeliveryDetailsPageView: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);

    const [hasError, notFound] = useUnit([$$hasError, $$notFound]);

    if (hasError && notFound) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <MainContainer>
                    <NotFound />
                    <NavbarMobile />
                </MainContainer>
            </div>
        );
    }

    return (
        <>
            <Header className="z-[2000]" backButton={<BackButton />} />
            <MainContainer>
                <Map />
                <Spacer y={4} />
                <Section>
                    <div className="flex gap-2">
                        <Heading content={t(TRANSLATION.LABEL_ID)} />
                        <DeliveryId />
                    </div>
                </Section>
                <Spacer y={4} />
                <Divider className="px-2" />
                <Spacer y={4} />
                <Section>
                    <Heading content={t(TRANSLATION.LABEL_CLIENT)} />
                    <Client />
                </Section>
                <Spacer y={4} />
                <Section>
                    <Heading content={t(TRANSLATION.LABEL_CLIENT_TYPE)} />
                    <ClientType />
                </Section>
                <Spacer y={4} />
                <Section>
                    <Heading content={t(TRANSLATION.LABEL_PICKUP)} />
                    <DeliveryPickup />
                </Section>
                <Spacer y={4} />
                <Section>
                    <div className="flex gap-4">
                        <div className="flex-grow">
                            <Heading content={t(TRANSLATION.LABEL_TYPE)} />
                            <DeliveryTypeTransport />
                        </div>
                        <div className="flex-grow">
                            <Heading content={t(TRANSLATION.LABEL_EXPRESS)} />
                            <DeliveryTypeExpress />
                        </div>
                    </div>
                </Section>
                <Spacer y={4} />
                <Section>
                    <Heading content={t(TRANSLATION.LABEL_ADDRESS)} />
                    <DeliveryAddress />
                </Section>
                <Spacer y={4} />
                <Section>
                    <Heading content={t(TRANSLATION.LABEL_METRO)} />
                    <DeliveryAddressSubway />
                </Section>
                <Spacer y={4} />
                <Section>
                    <Heading content={t(TRANSLATION.LABEL_CONTENTS)} />
                    <DeliveryContents />
                </Section>
                <Spacer y={4} />
                <Section>
                    <Heading content={t(TRANSLATION.LABEL_WEIGHT)} />
                    <DeliveryWeight />
                </Section>
                <Spacer y={4} />
                <Divider className="px-2" />
                <Spacer y={4} />
                <Section>
                    <Heading content={t(TRANSLATION.LABEL_CONTACT_PERSON)} />
                    <Spacer y={4} />
                    <DeliveryContactPerson />
                </Section>
                <Spacer y={4} />
                <Divider className="px-2" />
                <Spacer y={4} />
                <Section>
                    <div className="flex items-center">
                        <div className="flex-grow">
                            <Heading content={t(TRANSLATION.LABEL_COURIER)} />
                        </div>
                        <div>
                            <MyDeliveryChip>
                                {t(TRANSLATION.LABEL_MY_DELIVERY)}
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
                    <Heading content={t(TRANSLATION.LABEL_DELIVERY_STATUS)} />
                    <Spacer y={4} />
                    <DeliveryStatusControlWithTimeline />
                </Section>
                <Spacer y={4} />
                <Divider className="px-2" />
                <Spacer y={4} />
                <Section>
                    <Heading content={t(TRANSLATION.LABEL_MANAGER)} />
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
