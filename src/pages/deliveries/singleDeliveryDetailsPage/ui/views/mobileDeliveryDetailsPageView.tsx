import { PropsWithChildren, ReactNode } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { Button, Divider, Spacer } from '@nextui-org/react';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { LuArrowLeft } from 'react-icons/lu';
import { UserCardRow } from '@/entities/user';
import clsx from 'clsx';
import { widgetDeliveryStatusUi } from '@/widgets/deliveries/deliveryStatus';
import { sessionModel } from '@/entities/viewer';
import { User } from '@/shared/api';
import { $deliveryId } from '../../model';

const { NavbarMobile } = widgetNavbarMobileUi;
const { DeliveryStatusControlWithTimeline } = widgetDeliveryStatusUi;
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
        <div>
            <UserCardRow account={user} />
        </div>
    );
};

const Courier: FunctionComponent<{ user: User }> = ({ user }) => {
    return (
        <div>
            <UserCardRow account={user} />
        </div>
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
    const deliveryId = useUnit($deliveryId);
    const user = useUnit(sessionModel.$sessionStore);
    return (
        <>
            <Header
                className="z-[500]"
                backButton={<BackButton />}
                title={deliveryId.padStart(6, '0')}
            />
            <MainContainer>
                <div className="flex h-[50vh] w-full flex-col items-center justify-center bg-content1">
                    <span>карта</span>
                </div>
                <Spacer y={4} />
                <Section>
                    <Heading content={`Delivery ID: ${deliveryId}`} />
                </Section>
                <Spacer y={4} />
                <Section>
                    <Heading content="Delivery Status" />
                    <DeliveryStatusControlWithTimeline />
                </Section>
                <Spacer y={6} />
                <Divider className="px-2" />
                <Spacer y={6} />
                <Section>
                    <Heading content="Курьер" />
                    <Spacer y={2} />
                    <Courier user={user} />
                </Section>
                <Spacer y={6} />
                <Section>
                    <Heading content="Менеджер" />
                    <Spacer y={2} />
                    <Manager user={user} />
                </Section>
                <Spacer y={4} />
            </MainContainer>
            <Spacer y={24} />
            <NavbarMobile />
        </>
    );
};
