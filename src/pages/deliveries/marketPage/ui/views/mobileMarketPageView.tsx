import { PropsWithChildren, useRef } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { widgetMarketUi } from '@/widgets/deliveries/market';
import { sharedConfigRoutes } from '@/shared/config';
import { Button, Input, Spacer } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { widgetTopbarUi } from '@/widgets/viewer/welcome-topbar';
import { Link } from 'react-router-dom';
import { useUnit } from 'effector-react';
import {
    widgetSearchQueryPopupUi,
    widgetSearchQueryPopupModel,
} from '@/widgets/search/searchQueryPopup';
import { widgetMyDeliveriesUi } from '@/widgets/deliveries/myDeliveries';
import { translationNS } from '../../config';

const {
    RouteName: { DELIVERIES },
} = sharedConfigRoutes;
const { MarketContent, MarketFilterScrollable, MarketDateSelector } =
    widgetMarketUi;
const { NavbarMobile } = widgetNavbarMobileUi;
const { WelcomeTopbar } = widgetTopbarUi;
const { SearchQueryInputModal } = widgetSearchQueryPopupUi;
const { MyDeliveriesRow } = widgetMyDeliveriesUi;

/**
 * Constants
 */

const UPCOMING_DELIVERIES_LABEL = 'section.label.upcoming';
const GOTO_MY_DELIVERIES_LINK_LABEL = 'section.link.myDeliveries';
const MARKET_LABEL = 'section.label.market';

/**
 * Layout
 */
const Content: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col lg:mx-auto lg:w-[750px]">
        {children}
    </main>
);

const Heading: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <h2 className="text-xl font-bold">{children}</h2>
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

/**
 * Components
 */
const Header: FunctionComponent = () => {
    const reference = useRef<HTMLInputElement>(null);
    const [openSearchModal] = useUnit([
        widgetSearchQueryPopupModel.modal.clickTriggerElement,
    ]);

    const onClickSearchInput = (): void => {
        reference?.current?.blur();
        openSearchModal();
    };

    return (
        <header className="w-full rounded-b-3xl bg-black p-6 dark:bg-content1">
            <WelcomeTopbar />
            <Spacer y={4} />
            <Input
                ref={reference}
                autoFocus={false}
                placeholder="поиск по заказам"
                labelPlacement="outside"
                onClick={onClickSearchInput}
                startContent={
                    <div className="pointer-events-none flex items-center">
                        <span className="text-small text-default-400">#</span>
                    </div>
                }
            />
        </header>
    );
};

const UpcomingDeliveriesSection: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const { t } = useTranslation(translationNS);
    return (
        <Section>
            <SectionHead>
                <Heading>{t(UPCOMING_DELIVERIES_LABEL)}</Heading>
                <Button as={Link} to={DELIVERIES} size="sm" radius="full">
                    {t(GOTO_MY_DELIVERIES_LINK_LABEL)}
                </Button>
            </SectionHead>
            {children}
        </Section>
    );
};

const MarketDeliveriesSection: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const { t } = useTranslation(translationNS);
    return (
        <Section>
            <SectionHead>
                <Heading>{t(MARKET_LABEL)}</Heading>
            </SectionHead>
            <Spacer y={2} />
            <MarketDateSelector typePicker="scroll" />
            <Spacer y={2} />
            <MarketFilterScrollable withOutPadding />
            <Spacer y={6} />
            <SectionBody>
                <MarketContent />
            </SectionBody>
        </Section>
    );
};

/**
 * @name MobileMarketPageView
 * @description Page for deliveries exchange
 * @constructor
 */
export const MobileMarketPageView: FunctionComponent = () => {
    return (
        <>
            <Header />
            <Spacer y={6} />
            <Content>
                <UpcomingDeliveriesSection>
                    <MyDeliveriesRow />
                </UpcomingDeliveriesSection>
                <Spacer y={4} />
                <MarketDeliveriesSection />
            </Content>

            <NavbarMobile />
            <SearchQueryInputModal size="full" />
        </>
    );
};
