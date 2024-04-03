import type { PropsWithChildren } from 'react';
import { widgetMarketUi } from '@/widgets/deliveries/market';
import { Spacer } from '@nextui-org/react';

import { FiSearch } from 'react-icons/fi';
import { UserCardRow } from '@/entities/user';
import { useUnit } from 'effector-react';
import { widgetNavbarDesktopUi } from '@/widgets/layout/navbar-desktop';
import { sessionModel } from '@/entities/viewer';
import {
    MarketHeadingText,
    UpcomingDeliveriesHeadingText,
} from '@/pages/deliveries/marketPage/ui/common/data';

const { Navbar } = widgetNavbarDesktopUi;
const { MarketContent, MarketDateSelector, MarketFilterScrollable } =
    widgetMarketUi;

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="grid h-screen w-screen grid-cols-[max-content_auto] gap-8">
        {children}
    </div>
);

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="flex-col overflow-hidden px-2">{children}</main>
);

const Toolbar: FunctionComponent = () => {
    const user = useUnit(sessionModel.$viewerProfileData);

    const searchStartContent = (
        <FiSearch className="pointer-events-none flex-shrink-0 text-xl text-default-400" />
    );
    const searchEndContent = (
        <div className="pointer-events-none flex items-center">
            <span className="text-small text-default-400">@gmail.com</span>
        </div>
    );

    return (
        <div className="flex w-full items-center justify-between py-6 pr-4">
            <div className="w-1/2">popover</div>
            <div>
                <UserCardRow user={user} avatarPosition="right" />
            </div>
        </div>
    );
};

const UpcomingDeliveries: FunctionComponent = () => {
    return (
        <div className="pr-4">
            <h2 className="text-2xl font-bold capitalize">
                <UpcomingDeliveriesHeadingText />
            </h2>
            <Spacer y={8} />
            <div>карточка пользователя</div>
        </div>
    );
};

const MarketDeliveries: FunctionComponent = () => {
    return (
        <div className="pr-4">
            <h2 className="text-2xl font-bold capitalize">
                <MarketHeadingText />
            </h2>
            <Spacer y={8} />
            <div>
                <MarketDateSelector typePicker="scroll" />
                <MarketFilterScrollable />
                <Spacer y={2} />
                <MarketContent />
            </div>
        </div>
    );
};

export const DesktopMarketPageView: FunctionComponent = () => {
    return (
        <Layout>
            <Navbar />
            <MainContainer>
                <Toolbar />
                <Spacer y={4} />
                <UpcomingDeliveries />
                <Spacer y={16} />
                <MarketDeliveries />
            </MainContainer>
        </Layout>
    );
};
