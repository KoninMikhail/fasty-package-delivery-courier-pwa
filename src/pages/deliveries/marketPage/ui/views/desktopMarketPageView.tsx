import type { PropsWithChildren } from 'react';
import { Heading } from '@/shared/ui/components';
import { widgetMarketUi } from '@/widgets/deliveries/market';
import { widgetFooterUi } from '@/widgets/layout/footer';
import { widgetHeaderUi } from '@/widgets/layout/header';
import { Spacer } from '@nextui-org/react';

const { Footer } = widgetFooterUi;
const { Header } = widgetHeaderUi;
const { MarketContent } = widgetMarketUi;

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="flex w-full flex-col px-2 lg:mx-auto">{children}</main>
);

export const DesktopMarketPageView: FunctionComponent = () => {
    return (
        <div
            className="h-scr een

        flex w-screen gap-8"
        >
            <div>
                <Header />
            </div>
            <div className="h-full w-full flex-grow">
                <MainContainer>
                    <div>
                        <Heading size="large" weight="bold">
                            Активные доставки
                        </Heading>
                        <Spacer y={8} />
                    </div>
                    <Spacer y={16} />
                    <div>
                        <Heading size="large" weight="bold">
                            Взять доставку
                        </Heading>
                        <Spacer y={8} />
                        <MarketContent />
                    </div>
                </MainContainer>
                <Footer />
            </div>
        </div>
    );
};
