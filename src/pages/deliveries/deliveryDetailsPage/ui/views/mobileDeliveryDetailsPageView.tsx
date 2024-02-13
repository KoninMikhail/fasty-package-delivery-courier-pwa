import type { PropsWithChildren, ReactNode } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { viewerUi } from '@/entities/viewer';
import { Spacer } from '@nextui-org/react';

const { Authorized } = viewerUi;
const { NavbarMobile } = widgetNavbarMobileUi;

/**
 * @name MainContainer
 * @description Container for page content
 * @param children
 * @constructor
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

const Header: FunctionComponent = () => (
    <header className="w-full rounded-b-3xl bg-black p-6">fgdfg</header>
);

export const MobileDeliveryDetailsPageView: FunctionComponent = () => {
    return (
        <>
            <Header />
            <Spacer y={4} />
            <MainContainer>sdfsd</MainContainer>
            <NavbarMobile />
        </>
    );
};
