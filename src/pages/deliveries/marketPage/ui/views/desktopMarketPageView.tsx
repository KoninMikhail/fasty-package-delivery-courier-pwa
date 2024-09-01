import { useRef, type PropsWithChildren } from 'react';
import { widgetMarketUi } from '@/widgets/deliveries/market';
import { Input, Spacer } from '@nextui-org/react';

import { UserCardRow } from '@/entities/user';
import { useUnit } from 'effector-react';
import { widgetNavbarDesktopUi } from '@/widgets/layout/navbar-desktop';
import { sessionModel } from '@/entities/viewer';
import {
    widgetSearchQueryPopupModel,
    widgetSearchQueryPopupUi,
} from '@/widgets/search/searchQueryPopup';
import { widgetMyDeliveriesUi } from '@/widgets/deliveries/myDeliveries';
import { IoSearchSharp } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import {
    MARKET_LABEL,
    SEARCH_PLACEHOLDER,
    translationNS,
    UPCOMING_DELIVERIES_LABEL,
} from '../../config';

const { SearchQueryInputModal } = widgetSearchQueryPopupUi;
const { UpcomingDeliveriesHorizontalSlider } = widgetMyDeliveriesUi;

const { Navbar } = widgetNavbarDesktopUi;
const { MarketContent, MarketDateSelector, MarketFilterScrollable } =
    widgetMarketUi;

const Root: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="relative grid h-screen w-screen overflow-hidden">
        {children}
    </div>
);

const Sidebar: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <div className="fixed z-[7000] h-full w-48 border-r border-gray-200 bg-white">
            {children}
        </div>
    );
};

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="relative h-full flex-col overflow-hidden overflow-y-scroll pl-72 pt-20">
        {children}
    </main>
);

const Toolbar: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const reference = useRef<HTMLInputElement>(null);
    const user = useUnit(sessionModel.$viewerProfileData);
    const [openSearchModal] = useUnit([
        widgetSearchQueryPopupModel.searchTriggerClicked,
    ]);
    const onClickSearchInput = (): void => {
        reference?.current?.blur();
        openSearchModal();
    };
    return (
        <>
            <div className="fixed left-64 right-0 top-0 z-[20] flex items-center justify-between bg-gradient-to-b from-background to-transparent px-8 py-6 pl-16">
                <div className="w-1/2">
                    <Input
                        ref={reference}
                        size="lg"
                        placeholder={t(SEARCH_PLACEHOLDER)}
                        onClick={onClickSearchInput}
                        startContent={<IoSearchSharp className="text-xl" />}
                    />
                </div>
                <div>
                    <UserCardRow user={user} avatarPosition="right" />
                </div>
            </div>
            <SearchQueryInputModal size="2xl" backdrop="blur" />
        </>
    );
};

const UpcomingDeliveries: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="px-8">
            <h2 className="text-2xl font-bold capitalize">
                {t(UPCOMING_DELIVERIES_LABEL)}
            </h2>
            <Spacer y={8} />
            <UpcomingDeliveriesHorizontalSlider />
        </div>
    );
};

const MarketDeliveries: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="px-8">
            <h2 className="text-2xl font-bold capitalize">{t(MARKET_LABEL)}</h2>
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
            <Sidebar>
                <Navbar />
            </Sidebar>
            <MainContainer>
                <Toolbar />
                <Spacer y={8} />
                <UpcomingDeliveries />
                <Spacer y={8} />
                <MarketDeliveries />
            </MainContainer>
        </Root>
    );
};
