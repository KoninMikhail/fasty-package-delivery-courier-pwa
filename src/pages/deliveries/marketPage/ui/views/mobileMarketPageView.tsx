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
import { widgetUpcomingDeliveriesUi } from '@/widgets/deliveries/upcommingDeliveries';
import { Offline, SlowNetwork } from '@/entities/viewer';
import { translationNS } from '../../config';

const {
    RouteName: { DELIVERIES },
} = sharedConfigRoutes;
const { MarketContent, MarketFilterScrollable, MarketDateSelector } =
    widgetMarketUi;
const { NavbarMobile } = widgetNavbarMobileUi;
const { WelcomeTopbar } = widgetTopbarUi;
const { UpcomingDeliveriesScroller } = widgetUpcomingDeliveriesUi;
const { SearchQueryInputModal } = widgetSearchQueryPopupUi;

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
        widgetSearchQueryPopupModel.clickTriggerElement,
    ]);

    const onClickSearchInput = (): void => {
        reference?.current?.blur();
        openSearchModal();
    };

    return (
        <header className="w-full rounded-b-3xl bg-black p-6">
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

const UpcomingDeliveries: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const heading = t(UPCOMING_DELIVERIES_LABEL);
    const myDeliveriesLinkLabel = t(GOTO_MY_DELIVERIES_LINK_LABEL);
    return (
        <Section>
            <SectionHead>
                <Heading>{heading}</Heading>
                <Button as={Link} to={DELIVERIES} size="sm" radius="full">
                    {myDeliveriesLinkLabel}
                </Button>
            </SectionHead>

            <UpcomingDeliveriesScroller />
        </Section>
    );
};

const AvailableDeliveries: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const heading = t(MARKET_LABEL);
    return (
        <Section>
            <SectionHead>
                <Heading>{heading}</Heading>
            </SectionHead>
            <Spacer y={2} />
            <MarketDateSelector withOutPadding />
            <Spacer y={2} />
            <MarketFilterScrollable withOutPadding />
            <Spacer y={6} />
            <SectionBody>
                <MarketContent />
            </SectionBody>
        </Section>
    );
};

export const FloatingInfo: FunctionComponent = () => {
    return (
        <div className="fixed top-0 w-full text-center">
            <Offline>dsfsdfdfs</Offline>
            <SlowNetwork>слоу нетворк</SlowNetwork>
        </div>
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
            <FloatingInfo />
            <Header />
            <Spacer y={6} />
            <Content>
                <UpcomingDeliveries />
                <Spacer y={4} />
                <AvailableDeliveries />
            </Content>
            <NavbarMobile />
            <SearchQueryInputModal size="full" />
        </>
    );
};
