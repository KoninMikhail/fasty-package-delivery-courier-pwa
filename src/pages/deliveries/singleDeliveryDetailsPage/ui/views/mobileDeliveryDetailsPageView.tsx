import { PropsWithChildren, ReactNode } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { Button, Chip, Divider, Spacer } from '@nextui-org/react';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { LuArrowLeft } from 'react-icons/lu';
import clsx from 'clsx';
import { User } from '@/shared/api';
import { Route } from '@/entities/route';
import { lazily } from 'react-lazily';
import { SuspenseLayout } from '@/shared/ui/layouts';
import { widgetDeliveryStatusUi } from '@/widgets/deliveries/deliveryStatus';
import { SubwayStationWithIcon } from '@/shared/services/subway';
import { ClientContactCardList, getDefaultContact } from '@/entities/contact';
import {
    $$deliveryAddress,
    $$deliveryClient,
    $$deliveryContents,
    $$deliveryCourier,
    $$deliveryId,
    $$deliveryManager,
    $$deliveryMetro,
    $$deliveryPickupDateTime,
    $$deliveryStatus,
    $$deliveryWeight,
    $$hasError,
    $$isViewerDelivery,
    $$notFound,
    mapModel,
} from '../../model';
import { NotFound } from './common';

const { UserCardRow } = lazily(() => import('@/entities/user'));
const { NavbarMobile } = widgetNavbarMobileUi;
const { DeliveryStatusControlWithTimeline } = widgetDeliveryStatusUi;

const DELIVERY_ID_LENGTH = 6;

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

const Manager: FunctionComponent<{ user: User }> = ({ user }) => {
    return (
        <SuspenseLayout>
            <UserCardRow account={user} />
        </SuspenseLayout>
    );
};

const Courier: FunctionComponent<{ user: User }> = ({ user }) => {
    return (
        <SuspenseLayout>
            <UserCardRow account={user} />
        </SuspenseLayout>
    );
};

const BackButton: FunctionComponent = () => {
    const navigate = useNavigate();

    const onClick = () => {
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
    title: string;
    className?: string;
}> = ({ title, backButton, className }) => (
    <header
        className={clsx(
            'absolute top-4 flex w-full items-center justify-between px-4',
            className,
        )}
    >
        {backButton}
        <h1 className="text-xl font-semibold">{title}</h1>
        <div className="w-8" />
    </header>
);

export const MobileDeliveryDetailsPageView: FunctionComponent = () => {
    const [
        id,
        address,
        pickupDateTime,
        status,
        contents,
        weight,
        manager,
        client,
        courier,
        metro,
        isMyDelivery,
    ] = useUnit([
        $$deliveryId,
        $$deliveryAddress,
        $$deliveryPickupDateTime,
        $$deliveryStatus,
        $$deliveryContents,
        $$deliveryWeight,
        $$deliveryManager,
        $$deliveryClient,
        $$deliveryCourier,
        $$deliveryMetro,
        $$isViewerDelivery,
    ]);
    const deliveryId = id?.toString().padStart(DELIVERY_ID_LENGTH, '0') ?? '';

    const [hasError, notFound] = useUnit([$$hasError, $$notFound]);

    console.log(address);

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

    const contact = getDefaultContact(client.contacts);

    return (
        <>
            <Header
                className="z-[500]"
                backButton={<BackButton />}
                title={deliveryId}
            />
            <MainContainer>
                <Route.Map.SimpleMap
                    model={mapModel}
                    className="h-[50vh] w-full"
                />
                <Spacer y={4} />
                <Section>
                    <Heading content={`Delivery ID: ${deliveryId}`} />
                </Section>
                <Spacer y={4} />
                <Divider className="px-2" />
                <Spacer y={4} />
                <Section>
                    <Heading content="Клиент" />
                    <p>{client.name}</p>
                </Section>
                <Spacer y={4} />
                <Section>
                    <Heading content="Тип клиента" />
                    <p>имя</p>
                </Section>
                <Spacer y={4} />
                <Section>
                    <Heading content="Дата и время доставки" />
                    <p>{pickupDateTime}</p>
                </Section>
                <Spacer y={4} />
                <Section>
                    <div className="flex gap-4">
                        <div className="flex-grow">
                            <Heading content="Тип доставки" />
                            <p>На машине</p>
                        </div>
                        <div className="flex-grow">
                            <Heading content="Срочная" />
                            <p>да</p>
                        </div>
                    </div>
                </Section>
                <Spacer y={4} />
                <Section>
                    <Heading content="Адресс" />
                    <p>{address}</p>
                </Section>
                <Spacer y={4} />
                <Section>
                    <Heading content="Метро" />
                    <SubwayStationWithIcon value={metro} />
                </Section>
                <Spacer y={4} />
                <Section>
                    <Heading content="Cодержимое" />
                    <p>{contents}</p>
                </Section>
                <Spacer y={4} />
                <Section>
                    <Heading content="Вес" />
                    <p>{weight}</p>
                </Section>
                <Spacer y={4} />
                <Divider className="px-2" />
                <Spacer y={4} />
                <Section>
                    <Heading content="Контактное лицо" />
                    <Spacer y={4} />
                    <ClientContactCardList contact={contact} />
                </Section>
                <Spacer y={4} />
                <Divider className="px-2" />
                <Spacer y={4} />
                <Section>
                    <div className="flex items-center">
                        <div className="flex-grow">
                            <Heading content="Курьер" />
                        </div>
                        <div>
                            {isMyDelivery ? (
                                <Chip color="warning" variant="solid" size="sm">
                                    Моя доставка
                                </Chip>
                            ) : null}
                        </div>
                    </div>
                    <Spacer y={2} />
                    {courier ? <Courier user={courier} /> : null}
                </Section>
                <Spacer y={4} />
                <Divider className="px-2" />
                <Spacer y={4} />
                <Section>
                    <Heading content="Delivery Status" />
                    <Spacer y={4} />
                    <DeliveryStatusControlWithTimeline />
                </Section>
                <Spacer y={4} />
                <Divider className="px-2" />
                <Spacer y={4} />

                <Section>
                    <Heading content="Ответственный" />
                    <Spacer y={2} />
                    {manager ? <Manager user={manager} /> : null}
                </Section>
                <Spacer y={4} />
            </MainContainer>
            <Spacer y={20} />
            <NavbarMobile />
        </>
    );
};
