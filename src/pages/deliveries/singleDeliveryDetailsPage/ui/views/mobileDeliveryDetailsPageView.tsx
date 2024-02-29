import { PropsWithChildren, ReactNode } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { Button, Spacer } from '@nextui-org/react';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { LuArrowLeft } from 'react-icons/lu';
import { UserCardRow } from '@/entities/user';
import clsx from 'clsx';
import { $deliveryId } from '../../model';

const { NavbarMobile } = widgetNavbarMobileUi;

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

const Status = () => {
    return <div>Manager</div>;
};

const Manager: FunctionComponent = () => {
    return (
        <div>
            <UserCardRow account={{ name: 'Manager' }} />
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
    return (
        <>
            <Header
                className="z-[500]"
                backButton={<BackButton />}
                title={deliveryId.padStart(6, '0')}
            />
            <MainContainer>
                <Spacer y={4} />
                <Section>
                    <h3 className="font-bold">Delivery Info</h3>
                </Section>
                <Spacer y={4} />
                <Section>
                    <h3 className="font-bold">Delivery status</h3>
                    <Status />
                </Section>
                <Spacer y={4} />
                <Section>
                    <Manager />
                </Section>
                <Spacer y={4} />
            </MainContainer>
            <NavbarMobile />
        </>
    );
};
