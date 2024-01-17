import type { PropsWithChildren } from 'react';

import { widgetInProgressDeliveriesUi } from '@/widgets/deliveries/in-progress-deliveries';
import { widgetHistoryDeliveriesUi } from '@/widgets/deliveries/history-deliveries';
import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { widgetAccountDeliveriesMapUi } from '@/widgets/deliveries/account-deliveries-map';
import { sharedUiComponents } from '@/shared/ui';
import { sessionUi } from '@/entities/session';
import { widgetAccountDeliveriesStatsUi } from '@/widgets/deliveries/account-deliveries-stats';
import { useMotionValueEvent, useScroll } from 'framer-motion';

const { Authorized, Guest } = sessionUi;
const { InProgressDeliveriesList } = widgetInProgressDeliveriesUi;
const { HistoryDeliveries } = widgetHistoryDeliveriesUi;
const { AccountDeliveriesMapStats } = widgetAccountDeliveriesStatsUi;
const { AccountDeliveriesMap } = widgetAccountDeliveriesMapUi;
const { NavbarMobile } = widgetNavbarMobileUi;
const { Heading, Text, NativeScroll } = sharedUiComponents;

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="mx-auto -mt-8 h-full w-full flex-col rounded-t-3xl bg-white p-2 pb-24 lg:w-[750px]">
        {children}
    </main>
);

const Header: FunctionComponent = () => {
    const { scrollY, scrollYProgress } = useScroll();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        console.log('Page scroll:', latest);
    });

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        console.log('Page Y progress:', latest);
    });

    return (
        <header className="max-w-full gap-4 bg-black px-4 pb-12 pt-6">
            <div>
                <Heading size="large" weight="bold">
                    Ваши доставки
                </Heading>
                <Text as="span" size="small">
                    Получайте информацию и удобно управляейте
                </Text>
            </div>
            <div className="mx-auto lg:w-[750px]">
                <NativeScroll direction="horizontal">
                    <div className="grid grid-flow-col">
                        <AccountDeliveriesMap />
                        <HistoryDeliveries />
                        <AccountDeliveriesMapStats />
                    </div>
                </NativeScroll>
            </div>
        </header>
    );
};

export const MobileProfilePageView: FunctionComponent = () => {
    return (
        <>
            <Header />
            <MainContainer>
                <Authorized>
                    <InProgressDeliveriesList />
                </Authorized>
                <Guest>Вам нужно авторизоваться</Guest>
            </MainContainer>
            <NavbarMobile />
        </>
    );
};
