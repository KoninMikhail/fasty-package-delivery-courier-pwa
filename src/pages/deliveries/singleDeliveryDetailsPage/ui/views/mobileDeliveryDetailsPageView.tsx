import { PropsWithChildren, ReactNode } from 'react';
import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { Divider, Spacer } from '@nextui-org/react';
import { useUnit } from 'effector-react';
import { widgetDeliveryStatusUi } from '@/widgets/deliveries/deliveryStatus';
import { useTranslation } from 'react-i18next';
import { RiWifiOffLine } from 'react-icons/ri';
import { getDeliveryId } from '@/entities/delivery';
import { DetectNetworkConnectionState } from '@/features/device/detectNetworkConnectionState';
import { $pageDeliveryDetails } from '../../model/stores';
import { Error, Loading, NotFound, NotFoundOffline } from './common/states';
import { PageState } from '../../types';
import { $pageContentState } from '../../model/model';
import {
    ClientType,
    DeliveryTypeTransport,
    DeliveryTypeExpress,
    OSMMap,
    Client,
    DeliveryManager,
    MyDeliveryChip,
    DeliveryContactPerson,
    DeliveryNumber,
    DeliveryAddressSubway,
    DeliveryPickup,
    DeliveryContents,
    DeliveryWeight,
    DeliveryCourier,
    DeliveryAddress,
    BackButton,
} from './common/components';

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
    LABEL_NOT_AVAILABLE_OFFLINE,
    LABEL_PICKUP,
    LABEL_TYPE,
    LABEL_WEIGHT,
    translationNS,
} from '../../config';

const { NavbarMobile } = widgetNavbarMobileUi;
const { DeliveryStatusControlWithTimeline } = widgetDeliveryStatusUi;
export const {
    model: { $$isOnline },
} = DetectNetworkConnectionState;

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

const Header: FunctionComponent<{
    backButton?: ReactNode;
    deliveryIdVisible?: boolean;
    className?: string;
}> = ({ backButton, className, deliveryIdVisible = true }) => {
    const delivery = useUnit($pageDeliveryDetails);
    const deliveryId = delivery
        ? getDeliveryId(delivery).padStart(6, '0')
        : null;

    const titleContent = deliveryIdVisible ? deliveryId || '0' : null;

    const headerClassName =
        'absolute top-4 z-[1100] flex w-full items-center justify-between px-4';
    const titleClassName =
        'text-xl font-semibold text-content1-foreground dark:text-content1';

    return (
        <header className={headerClassName}>
            {backButton}
            <h1 className={titleClassName}>{titleContent}</h1>
            <div className="w-8" />
        </header>
    );
};

const BlockWhenOffline: FunctionComponent<{
    children: ReactNode;
}> = ({ children }) => {
    const { t } = useTranslation(translationNS);
    const isOnline = useUnit($$isOnline);

    return isOnline ? (
        children
    ) : (
        <div className="relative block">
            <div className="absolute bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-background opacity-85">
                <div className="text-center">
                    <Spacer y={4} />
                    <RiWifiOffLine className="mx-auto text-5xl text-danger" />
                    <Spacer y={4} />
                    <span className="text-content3 text-danger">
                        {t(LABEL_NOT_AVAILABLE_OFFLINE)}
                    </span>
                </div>
            </div>
            {children}
        </div>
    );
};

export const MobileDeliveryDetailsPageView: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const { pageState } = useUnit({
        pageState: $pageContentState,
    });

    const isPageNotReady = pageState === PageState.INIT;
    const isPageNotFound = pageState === PageState.NotFound;
    const isPageNotFoundInCache = pageState === PageState.NotFoundOffline;
    const isPageHasErrors = pageState === PageState.Error;

    if (isPageNotReady) return <Loading />;
    if (isPageNotFound)
        return (
            <div className="flex h-full w-full items-center justify-center">
                <MainContainer>
                    <NotFound />
                    <NavbarMobile />
                </MainContainer>
            </div>
        );
    if (isPageNotFoundInCache)
        return (
            <div className="flex h-full w-full items-center justify-center">
                <MainContainer>
                    <NotFoundOffline />
                    <NavbarMobile />
                </MainContainer>
            </div>
        );
    if (isPageHasErrors)
        return (
            <div className="flex h-full w-full items-center justify-center">
                <MainContainer>
                    <Error />
                    <NavbarMobile />
                </MainContainer>
            </div>
        );
    return (
        <>
            <Header className="z-[2000]" backButton={<BackButton />} />
            <MainContainer>
                <OSMMap />
                <Spacer y={4} />
                <Section>
                    <div className="flex gap-2">
                        <Heading content={t(LABEL_ID)} />
                        <DeliveryNumber />
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
                            <MyDeliveryChip />
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
                    <BlockWhenOffline>
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
