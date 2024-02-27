import type { PropsWithChildren } from 'react';
import { widgetFooterUi } from '@/widgets/layout/footer';
import { widgetHeaderUi } from '@/widgets/layout/header';
import { Spacer } from '@nextui-org/react';

const { Footer } = widgetFooterUi;
const { Header } = widgetHeaderUi;
const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col px-2 lg:mx-auto lg:w-[1200px]">
        {children}
    </main>
);

export const DesktopProfileEditPageView: FunctionComponent = () => {
    return (
        <>
            <Header />
            <Spacer y={16} />
            <MainContainer>asdasd</MainContainer>
            <Spacer y={16} />
            <Footer />
        </>
    );
};
