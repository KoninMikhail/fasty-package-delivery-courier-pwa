import type { PropsWithChildren } from 'react';
import { widgetFooterUi } from '@/widgets/layout/footer';
import { Spacer } from '@nextui-org/react';
import { widgetNavbarDesktopUi } from '@/widgets/layout/navbar-desktop';

const { Footer } = widgetFooterUi;
const { Navbar } = widgetNavbarDesktopUi;
const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col px-2 lg:mx-auto lg:w-[1200px]">
        {children}
    </main>
);

export const DesktopProfileEditPageView: FunctionComponent = () => {
    return (
        <>
            <Navbar />
            <Spacer y={16} />
            <MainContainer>asdasd</MainContainer>
            <Spacer y={16} />
            <Footer />
        </>
    );
};
