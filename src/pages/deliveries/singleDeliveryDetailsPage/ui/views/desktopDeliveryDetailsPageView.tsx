import type { PropsWithChildren } from 'react';
import { widgetNavbarDesktopUi } from '@/widgets/layout/navbar-desktop';

import { Divider, Spacer } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { widgetDeliveryStatusUi } from '@/widgets/deliveries/deliveryStatus';

import {
    Client,
    ClientType,
    DeliveryTypeExpress,
    DeliveryTypeTransport,
    DeliveryWeight,
    DeliveryPickup,
    OSMMap,
    DeliveryManager,
    MyDeliveryChip,
    DeliveryAddress,
    DeliveryAddressSubway,
    DeliveryContents,
    DeliveryContactPerson,
    DeliveryCourier,
    DeliveryId,
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
    LABEL_MANAGER,
    LABEL_METRO,
    LABEL_PICKUP,
    LABEL_TYPE,
    LABEL_WEIGHT,
    translationNS,
} from '../../config';

const { Navbar } = widgetNavbarDesktopUi;
const { DeliveryStatusControlWithTimeline } = widgetDeliveryStatusUi;

/**
 * ================================
 * Layout
 * ================================
 */
const Section: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <section className="grid gap-2 p-2">{children}</section>
);

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="relative h-screen w-screen">{children}</div>
);

const NavContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="absolute bottom-0 left-0 top-0 z-[600] h-full">
        {children}
    </div>
);

const Map: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="ml-64 mr-[38%] h-full">{children}</div>
);

const DeliveryDetailsContainer: FunctionComponent<PropsWithChildren> = ({
    children,
}) => (
    <div className="absolute bottom-0 right-0 top-0 z-[6200] h-full w-[40%] overflow-y-auto rounded-l-3xl bg-content1 p-4 shadow-xl">
        <main className="">{children}</main>
    </div>
);

const Label: FunctionComponent<{ content: string }> = ({ content }) => {
    return <h3 className="font-bold">{content}</h3>;
};

/**
 * ================================
 * Components
 * ================================
 */

const ClientLabel: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return <Label content={t(LABEL_CLIENT)} />;
};

const ClientTypeLabel: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return <Label content={t(LABEL_CLIENT_TYPE)} />;
};

const DeliveryPickupLabel: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return <Label content={t(LABEL_PICKUP)} />;
};

const DeliveryTypeTransportLabel: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return <Label content={t(LABEL_TYPE)} />;
};

const DeliveryTypeExpressLabel: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return <Label content={t(LABEL_EXPRESS)} />;
};

const DeliveryAddressLabel: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return <Label content={t(LABEL_ADDRESS)} />;
};

const DeliveryContentsLabel: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return <Label content={t(LABEL_CONTENTS)} />;
};

const DeliveryStatusLabel: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return <Label content={t(LABEL_DELIVERY_STATUS)} />;
};

const DeliveryManagerLabel: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return <Label content={t(LABEL_MANAGER)} />;
};

const DeliveryCourierLabel: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return <Label content={t(LABEL_COURIER)} />;
};

const DeliveryContactPersonLabel: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return <Label content={t(LABEL_CONTACT_PERSON)} />;
};

const DeliveryAddressSubwayLabel: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return <Label content={t(LABEL_METRO)} />;
};

const DeliveryWeightLabel: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return <Label content={t(LABEL_WEIGHT)} />;
};

/**
 * @name DesktopDeliveryDetailsPageView
 * @constructor
 */
export const DesktopDeliveryDetailsPageView: FunctionComponent = () => {
    return (
        <Layout>
            <NavContainer>
                <Navbar />
            </NavContainer>
            <Map>
                <OSMMap
                    classNames={{
                        controlsPanel: 'right-[60px] bottom-6',
                        container: 'h-screen w-full',
                    }}
                />
            </Map>
            <DeliveryDetailsContainer>
                <div className="flex items-center gap-2">
                    <BackButton />
                    <h1 className="px-2 py-4 text-xl font-bold">
                        Доставка #<DeliveryId />
                    </h1>
                </div>
                <Spacer y={2} />
                <Divider />
                <Spacer y={2} />
                <div className="grid grid-cols-2 p-2">
                    <div>
                        <ClientLabel />
                        <Client />
                    </div>
                    <div>
                        <ClientTypeLabel />
                        <ClientType />
                    </div>
                </div>
                <Spacer y={2} />
                <Section>
                    <DeliveryPickupLabel />
                    <DeliveryPickup />
                </Section>
                <Spacer y={2} />
                <Section>
                    <div className="flex gap-4">
                        <div className="flex-grow">
                            <DeliveryTypeTransportLabel />
                            <DeliveryTypeTransport />
                        </div>
                        <div className="flex-grow">
                            <DeliveryTypeExpressLabel />
                            <DeliveryTypeExpress />
                        </div>
                    </div>
                </Section>
                <Spacer y={2} />
                <Section>
                    <DeliveryAddressLabel />
                    <DeliveryAddress />
                </Section>
                <Spacer y={2} />
                <Section>
                    <DeliveryAddressSubwayLabel />
                    <DeliveryAddressSubway />
                </Section>
                <Spacer y={2} />
                <Section>
                    <DeliveryContentsLabel />
                    <DeliveryContents />
                </Section>
                <Spacer y={2} />
                <Section>
                    <DeliveryWeightLabel />
                    <DeliveryWeight />
                </Section>
                <Spacer y={2} />
                <Divider className="px-2" />
                <Spacer y={2} />
                <Section>
                    <DeliveryContactPersonLabel />
                    <Spacer y={0.5} />
                    <DeliveryContactPerson />
                </Section>
                <Spacer y={2} />
                <Divider className="px-2" />
                <Spacer y={2} />
                <Section>
                    <div className="flex items-center">
                        <div className="flex-grow">
                            <DeliveryCourierLabel />
                        </div>
                        <div>
                            <MyDeliveryChip />
                        </div>
                    </div>
                    <Spacer y={0.5} />
                    <DeliveryCourier />
                </Section>
                <Spacer y={2} />
                <Divider className="px-2" />
                <Spacer y={2} />
                <Section>
                    <DeliveryStatusLabel />
                    <Spacer y={0.5} />
                    <DeliveryStatusControlWithTimeline />
                </Section>
                <Spacer y={2} />
                <Divider className="px-2" />
                <Spacer y={2} />
                <Section>
                    <DeliveryManagerLabel />
                    <Spacer y={0.5} />
                    <DeliveryManager />
                </Section>
            </DeliveryDetailsContainer>
        </Layout>
    );
};
