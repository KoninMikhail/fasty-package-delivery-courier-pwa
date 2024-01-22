import type { PropsWithChildren } from 'react';
import { Heading } from '@/shared/ui/components';
import { DeliveriesMarket } from '@/widgets/deliveries/deliveres-market/ui';
import { InProgressDeliveriesSlider } from '@/widgets/deliveries/in-progress-deliveries/ui';
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

export const DesktopAuthPageView: FunctionComponent = () => {
    return (
        <>
            <Header />
            <Spacer y={16} />
            <MainContainer>
                <div>
                    <Heading size="large" weight="bold">
                        Активные доставки
                    </Heading>
                    <Spacer y={8} />
                    <InProgressDeliveriesSlider />
                </div>
                <Spacer y={16} />
                <div>
                    <Heading size="large" weight="bold">
                        Взять доставку
                    </Heading>
                    <Spacer y={8} />
                    <DeliveriesMarket />
                </div>
            </MainContainer>
            <Spacer y={16} />
            <Footer />
        </>
    );
};
