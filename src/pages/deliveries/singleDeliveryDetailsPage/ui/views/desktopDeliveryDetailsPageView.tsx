import type { PropsWithChildren, ReactNode } from 'react';
import { widgetNavbarUi } from '@/widgets/layout/navbar-desktop';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    ZoomControl,
} from 'react-leaflet';
import { Chip, Divider, Spacer } from '@nextui-org/react';
import { useUnit } from 'effector-react';
import {
    $$deliveryAddress,
    $$deliveryClientName,
    $$deliveryClientType,
    $$deliveryContact,
    $$deliveryContents,
    $$deliveryCourier,
    $$deliveryId,
    $$deliveryIsExpress,
    $$deliveryManager,
    $$deliveryMetro,
    $$deliveryPickupDateTime,
    $$deliveryType,
    $$deliveryWeight,
    $$isViewerDelivery,
} from '@/pages/deliveries/singleDeliveryDetailsPage/model';
import { SubwayStationWithIcon } from '@/shared/services/subway';
import { ClientContactCardList } from '@/entities/client';
import { UserCardRow } from '@/entities/user';
import { Section } from '@/shared/ui/layouts';
import { useTranslation } from 'react-i18next';
import { widgetDeliveryStatusUi } from '@/widgets/deliveries/deliveryStatus';
import { translationNS } from '../../config';

const { Navbar } = widgetNavbarUi;
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

interface ISectionWithTitleProperties {
    title: string;
    featureSlot?: ReactNode | ReactNode[];
}

const SectionWithTitle: FunctionComponent<
    PropsWithChildren<ISectionWithTitleProperties>
> = ({ children, title, featureSlot }) => {
    return (
        <div className="flex flex-col gap-4 overflow-visible">
            <div className="grid grid-cols-[auto_max-content]">
                <div>
                    <h3 className="px-2 text-xl font-semibold leading-none text-default-600">
                        {title}
                    </h3>
                </div>
                <div>{featureSlot}</div>
            </div>

            <div className="p-2">{children}</div>
        </div>
    );
};

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
    <div className="absolute bottom-0 right-0 top-0 z-[600] h-full w-[40%] overflow-y-auto rounded-l-3xl bg-content1 p-4">
        <main className="">{children}</main>
    </div>
);

const Heading: FunctionComponent<{ content: string }> = ({ content }) => {
    return <h3 className="font-bold">{content}</h3>;
};
const Client: FunctionComponent = () => {
    const name = useUnit($$deliveryClientName);
    return <p>{name}</p>;
};
const ClientType: FunctionComponent = () => {
    const type = useUnit($$deliveryClientType);
    return <p>{type}</p>;
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
    return <p>{type}</p>;
};
const DeliveryTypeExpress: FunctionComponent = () => {
    const express = useUnit($$deliveryIsExpress);
    return <p>{express}</p>;
};
const DeliveryAddress: FunctionComponent = () => {
    const address = useUnit($$deliveryAddress);
    return <p>{address}</p>;
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

export const DesktopDeliveryDetailsPageView: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const position = {
        lat: 51.505,
        lng: -0.09,
    };
    return (
        <Layout>
            <NavContainer>
                <Navbar />
            </NavContainer>
            <Map>
                <MapContainer
                    center={position}
                    zoom={13}
                    className="z-40 h-full w-full"
                    scrollWheelZoom={false}
                    zoomControl={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                    <ZoomControl position="bottomright" />
                </MapContainer>
            </Map>
            <DeliveryDetailsContainer>
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
            </DeliveryDetailsContainer>
        </Layout>
    );
};
