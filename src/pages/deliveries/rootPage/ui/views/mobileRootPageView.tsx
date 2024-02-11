import type { PropsWithChildren } from 'react';

import { widgetInProgressDeliveriesUi } from '@/widgets/deliveries/in-progress-deliveries';
import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { widgetDeliveriesMarketUi } from '@/widgets/deliveries/deliveres-market';
import { sharedUiComponents, sharedUiLayouts } from '@/shared/ui';
import { Button, Spacer } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { widgetMarketDeliveriesFilterUi } from '@/widgets/deliveries/market-deliveries-filter';
import { widgetTopbarUi } from '@/widgets/viewer/welcome-topbar';
import { translationNS } from '../../config';

const { Heading } = sharedUiComponents;
const { InProgressDeliveriesSlider } = widgetInProgressDeliveriesUi;
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
 * @name RootPage
 * @description Page for deliveries exchange
 * @constructor
 */
export const MobileRootPageView: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);

    return (
        <>
            <Header />
            <Spacer y={4} />
            <Content>
                <Section>
                    <SectionHead>
                        <Heading
                            tag="h2"
                            className="flex-grow"
                            size="large"
                            weight="bold"
                        >
                            {t('upcoming_deliveries')}
                        </Heading>
                        <Button size="sm" radius="full">
                            {t('all_deliveries')}
                        </Button>
                    </SectionHead>
                    <HorizontalScroll className="px-4">
                        <InProgressDeliveriesSlider />
                    </HorizontalScroll>
                </Section>
                <Spacer y={4} />
                <Section>
                    <SectionHead>
                        <Heading size="large" weight="bold">
                            {t('market')}
                        </Heading>
                    </SectionHead>
                    <Spacer y={2} />
                    <MarketDeliveriesFilter />
                    <Spacer y={2} />
                    <SectionBody>
                        <DeliveriesMarket />
                    </SectionBody>
                </Section>
            </Content>
            <NavbarMobile />
        </>
    );
};
