import type { PropsWithChildren } from 'react';
import { widgetFooterUi } from '@/widgets/layout/footer';
import { widgetHeaderUi } from '@/widgets/layout/header';

const { Footer } = widgetFooterUi;
const { Header } = widgetHeaderUi;

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col px-2 lg:mx-auto lg:w-[1200px]">
        {children}
    </main>
);

export const DesktopProfilePageView: FunctionComponent = () => {
    return (
        <>
            <Header />
            <MainContainer>контент</MainContainer>
            <Footer />
        </>
    );
};
