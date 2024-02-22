import type { PropsWithChildren, ReactNode } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { Button, Spacer } from '@nextui-org/react';
import { useUnit } from 'effector-react';
import { routeUi } from '@/entities/route';
import { useNavigate } from 'react-router-dom';
import { LuArrowLeft } from 'react-icons/lu';
import { $deliveryDetailsStore } from '../../model';

const { NavbarMobile } = widgetNavbarMobileUi;
const { Map } = routeUi;

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
    padding?: 'default' | 'none';
}
const Section: FunctionComponent<ISectionProperties> = ({
    children,
    padding = 'default',
}) =>
    padding === 'default' ? (
        <section className="w-full px-4">{children}</section>
    ) : (
        <section className="w-full">{children}</section>
    );

/**
 * Components
 */

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

const Header: FunctionComponent = () => (
    <header className="absolute top-4 flex w-full items-center justify-between px-4">
        <BackButton />
        <h1 className="text-xl font-semibold">00000000</h1>
        <div className="w-8" />
    </header>
);

export const MobileDeliveryDetailsPageView: FunctionComponent = () => {
    const data = useUnit($deliveryDetailsStore);
    return (
        <>
            <Header />
            <MainContainer>
                <Section padding="none">
                    <Map />
                </Section>

                <Spacer y={4} />
                <Section>
                    <div>{data?.id}</div>
                </Section>
                <Spacer y={4} />
                <Section>ghjgh</Section>
                <Spacer y={4} />
            </MainContainer>
            <NavbarMobile />
        </>
    );
};
