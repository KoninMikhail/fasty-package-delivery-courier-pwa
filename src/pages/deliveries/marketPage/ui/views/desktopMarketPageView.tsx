import type { PropsWithChildren } from 'react';
import { Heading } from '@/shared/ui/components';
import { widgetInProgressDeliveriesUi } from '@/widgets/deliveries/inProgress';
import { widgetDeliveriesMarketUi } from '@/widgets/deliveries/market';
import { widgetFooterUi } from '@/widgets/layout/footer';
import { widgetHeaderUi } from '@/widgets/layout/header';
import { Spacer } from '@nextui-org/react';

const { Footer } = widgetFooterUi;
const { Header } = widgetHeaderUi;
const { MyDeliveriesSlider } = widgetInProgressDeliveriesUi;
const { DeliveriesMarketMobile } = widgetDeliveriesMarketUi;

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col px-2 lg:mx-auto lg:w-[1200px]">
        {children}
    </main>
);

export const DesktopMarketPageView: FunctionComponent = () => {
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
                    <MyDeliveriesSlider />
                </div>
                <Spacer y={16} />
                <div>
                    <Heading size="large" weight="bold">
                        Взять доставку
                    </Heading>
                    <Spacer y={8} />
                    <DeliveriesMarketMobile />
                </div>
            </MainContainer>
            <Spacer y={16} />
            <Footer />
        </>
    );
};
