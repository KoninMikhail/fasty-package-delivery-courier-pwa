import type { PropsWithChildren } from 'react';

import { widgetInProgressDeliveriesUi } from '@/widgets/deliveries/in-progress-deliveries';
import { widgetHistoryDeliveriesUi } from '@/widgets/deliveries/history-deliveries';
import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { widgetAccountDeliveriesMapUi } from '@/widgets/deliveries/account-deliveries-map';
import { sharedUiLayouts } from '@/shared/ui';
import { sessionUi } from '@/entities/session';
import { Heading } from '@/shared/ui/components/typography';
import { widgetAccountDeliveriesStatsUi } from '@/widgets/deliveries/account-deliveries-stats';
import { useMotionValueEvent, useScroll } from 'framer-motion';

const { Authorized, Guest } = sessionUi;
const { InProgressDeliveriesList } = widgetInProgressDeliveriesUi;
const { HistoryDeliveries } = widgetHistoryDeliveriesUi;
const { AccountDeliveriesMapStats } = widgetAccountDeliveriesStatsUi;
const { AccountDeliveriesMap } = widgetAccountDeliveriesMapUi;
const { NavbarMobile } = widgetNavbarMobileUi;
const { Section } = sharedUiLayouts;

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
        <header className="grid w-full gap-8 bg-black p-6 pb-16">
            <div className="mx-auto grid w-full grid-cols-[auto_max-content] gap-2 text-white lg:w-[750px]">
                <div>
                    <p>name</p>
                    <p>Желаем хорошего дня!</p>
                </div>
                <div>setting</div>
            </div>
            <div className="mx-auto flex w-full overflow-x-scroll lg:w-[750px]">
                <div className="flex-none px-3 py-6">
                    <AccountDeliveriesMap />
                </div>
                <div className="flex-none px-3 py-6">
                    <HistoryDeliveries />
                </div>
                <div className="flex-none px-3 py-6">
                    <AccountDeliveriesMapStats />
                </div>
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
                    <Section>
                        <div>
                            <Heading size="large" weight="bold">
                                Ваши доставки
                            </Heading>
                            <Heading>
                                Получайте информацию и удобно управляейте
                            </Heading>
                        </div>
                        <InProgressDeliveriesList />
                    </Section>
                </Authorized>
                <Guest>Вам нужно авторизоваться</Guest>
            </MainContainer>
            <NavbarMobile />
        </>
    );
};
