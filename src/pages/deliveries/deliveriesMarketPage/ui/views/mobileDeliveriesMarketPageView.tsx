import type { PropsWithChildren } from 'react';

import { widgetInProgressDeliveriesUi } from '@/widgets/deliveries/my-deliveries';
import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { widgetDeliveriesMarketUi } from '@/widgets/deliveries/deliveres-market';
import { sharedConfigRoutes } from '@/shared/config';
import { sharedUiComponents, sharedUiLayouts } from '@/shared/ui';
import { Button, Spacer } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { widgetMarketDeliveriesFilterUi } from '@/widgets/deliveries/market-deliveries-filter';
import { widgetTopbarUi } from '@/widgets/viewer/welcome-topbar';
import { Link } from 'react-router-dom';
import { translationNS } from '../../config';

const { Heading } = sharedUiComponents;
const {
    RouteName: { DELIVERIES },
} = sharedConfigRoutes;
const { MyDeliveriesSlider } = widgetInProgressDeliveriesUi;
const { DeliveriesMarket } = widgetDeliveriesMarketUi;
const { NavbarMobile } = widgetNavbarMobileUi;
const { HorizontalScroll } = sharedUiLayouts;
const { MarketDeliveriesFilter } = widgetMarketDeliveriesFilterUi;
const { WelcomeTopbar } = widgetTopbarUi;

/**
 * Layout
 */
const Content: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col lg:mx-auto lg:w-[750px]">
        {children}
    </main>
);
const Section: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <section className="w-full">{children}</section>
);

const SectionHead: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="mb-2 flex items-start justify-between px-4">{children}</div>
);
const SectionBody: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="px-4">{children}</div>
);

const Header: FunctionComponent = () => (
    <header className="w-full rounded-b-3xl bg-black p-6">
        <WelcomeTopbar />
    </header>
);

/**
 * Components
 */

const UpcomingDeliveries: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const sectionHeading = t('upcoming_deliveries');

    const allDeliveriesLabel = t('all_upcoming_deliveries');

    return (
        <Section>
            <SectionHead>
                <h2 className="text-xl font-bold">{sectionHeading}</h2>
                <Button as={Link} to={DELIVERIES} size="sm" radius="full">
                    {allDeliveriesLabel}
                </Button>
            </SectionHead>
            <HorizontalScroll className="px-4">
                <MyDeliveriesSlider />
            </HorizontalScroll>
        </Section>
    );
};

const AvailableDeliveries: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const sectionHeading = t('market');
    return (
        <Section>
            <SectionHead>
                <h2 className="text-xl font-bold">{sectionHeading}</h2>
            </SectionHead>
            <Spacer y={2} />
            <MarketDeliveriesFilter />
            <Spacer y={2} />
            <SectionBody>
                <DeliveriesMarket />
            </SectionBody>
        </Section>
    );
};

/**
 * @name MobileDeliveriesMarketPageView
 * @description Page for deliveries exchange
 * @constructor
 */
export const MobileDeliveriesMarketPageView: FunctionComponent = () => {
    return (
        <>
            <Header />
            <Spacer y={4} />
            <Content>
                <UpcomingDeliveries />
                <Spacer y={4} />
                <AvailableDeliveries />
            </Content>
            <NavbarMobile />
        </>
    );
};
