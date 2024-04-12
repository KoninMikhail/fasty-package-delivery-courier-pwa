import { useRef, type PropsWithChildren } from 'react';
import { widgetMarketUi } from '@/widgets/deliveries/market';
import { Spacer } from '@nextui-org/react';

import { useUnit } from 'effector-react';
import { sessionModel } from '@/entities/viewer';
import {
    widgetSearchQueryPopupModel,
    widgetSearchQueryPopupUi,
} from '@/widgets/search/searchQueryPopup';
import { widgetMyDeliveriesUi } from '@/widgets/deliveries/myDeliveries';
import { Link } from 'react-router-dom';
import { sharedConfigRoutes } from '@/shared/config';
import { sharedUiBranding, sharedUiComponents } from '@/shared/ui';
import { navbarItems } from '@/widgets/layout/navbar-desktop/data';
import { useTranslation } from 'react-i18next';
import { translationNS } from '@/widgets/layout/navbar-desktop/config';
import { UserMenu } from '@/widgets/viewer/user-menu/ui/UserMenu';
import {
    MarketHeadingText,
    UpcomingDeliveriesHeadingText,
} from '../common/data';

const { Menu, MenuItem } = sharedUiComponents;
const { Logo } = sharedUiBranding;
const { RouteName } = sharedConfigRoutes;
const { ROOT_PAGE } = RouteName;
const { SearchQueryInputModal } = widgetSearchQueryPopupUi;
const { UpcomingDeliveriesHorizontalSlider } = widgetMyDeliveriesUi;
const { MarketContent, MarketDateSelector, MarketFilterScrollable } =
    widgetMarketUi;

const Root: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="mx-auto w-[1400px]">{children}</div>
);

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="relative h-full">{children}</main>
);

const Toolbar: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const reference = useRef<HTMLInputElement>(null);
    const user = useUnit(sessionModel.$viewerProfileData);
    const [openSearchModal] = useUnit([
        widgetSearchQueryPopupModel.modal.clickTriggerElement,
    ]);
    const onClickSearchInput = (): void => {
        reference?.current?.blur();
        openSearchModal();
    };
    return (
        <>
            <header className="sticky top-0 z-50 h-24 w-full bg-gradient-to-b from-background to-transparent px-8">
                <div className="flex h-24 w-full items-center justify-between">
                    <Link to={ROOT_PAGE}>
                        <Logo />
                    </Link>
                    <div className="mx-auto w-80">
                        <Menu
                            items={navbarItems}
                            stretch
                            orientation="horizontal"
                            renderItem={(item) => {
                                return (
                                    <MenuItem
                                        vertical
                                        icon={item.icon}
                                        key={item.href}
                                        to={item.href}
                                        classNames={{
                                            item: 'py-3 !text-sm',
                                        }}
                                        label={t(item.label)}
                                    />
                                );
                            }}
                        />
                    </div>
                    <div>
                        <UserMenu type="userCard" />
                    </div>
                </div>
            </header>
            <SearchQueryInputModal size="2xl" backdrop="blur" />
        </>
    );
};

const UpcomingDeliveries: FunctionComponent = () => {
    return (
        <div className="overflow-hidden px-8">
            <h2 className="text-2xl font-bold capitalize">
                <UpcomingDeliveriesHeadingText />
            </h2>
            <Spacer y={8} />
            <UpcomingDeliveriesHorizontalSlider />
        </div>
    );
};

const MarketDeliveries: FunctionComponent = () => {
    return (
        <div className="px-8">
            <h2 className="text-2xl font-bold capitalize">
                <MarketHeadingText />
            </h2>
            <Spacer y={8} />
            <div>
                <MarketDateSelector typePicker="scroll" />
                <MarketFilterScrollable />
                <Spacer y={4} />
                <MarketContent />
            </div>
        </div>
    );
};

export const DesktopMarketPageView: FunctionComponent = () => {
    return (
        <Root>
            <MainContainer>
                <Toolbar />
                <Spacer y={16} />
                <UpcomingDeliveries />
                <Spacer y={8} />
                <MarketDeliveries />
            </MainContainer>
        </Root>
    );
};
