import { widgetNavbarDesktopUi } from '@/widgets/layout/navbar-desktop';
import type { PropsWithChildren } from 'react';

const { Navbar } = widgetNavbarDesktopUi;

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="grid h-screen w-screen grid-cols-[max-content_auto] gap-8">
        {children}
    </div>
);

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="flex-col overflow-hidden px-2">{children}</main>
);

export const DesktopSearchPageView: FunctionComponent = () => {
    return (
        <Layout>
            <Navbar />
            <MainContainer>sdf</MainContainer>
        </Layout>
    );
};
