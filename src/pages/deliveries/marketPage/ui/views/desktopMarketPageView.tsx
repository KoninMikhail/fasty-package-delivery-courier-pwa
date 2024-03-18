import type { PropsWithChildren } from 'react';
import { Heading } from '@/shared/ui/components';
import { widgetMarketUi } from '@/widgets/deliveries/market';
import { Spacer, Input } from '@nextui-org/react';
import { widgetUpcomingDeliveriesUi } from '@/widgets/deliveries/upcommingDeliveries';
import { sessionModel } from '@/entities/viewer';

import { FiSearch } from 'react-icons/fi';
import { UserCardRow } from '@/entities/user';
import { useUnit } from 'effector-react';
import { widgetNavbarUi } from '@/widgets/layout/navbar-desktop';

const { UpcomingDeliveriesCarousel } = widgetUpcomingDeliveriesUi;
const { Navbar } = widgetNavbarUi;
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
    const user = useUnit(sessionModel.$sessionStore);
    return (
        <div className="flex w-full items-center justify-between py-6 pr-4">
            <div className="w-1/2">
                <Input
                    placeholder="nextui"
                    labelPlacement="outside"
                    startContent={
                        <FiSearch className="pointer-events-none flex-shrink-0 text-xl text-default-400" />
                    }
                    endContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-small text-default-400">
                                @gmail.com
                            </span>
                        </div>
                    }
                />
            </div>
            <div>
                <UserCardRow account={user} avatarPosition="right" />
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
                <div>
                    <Heading size="large" weight="bold">
                        Активные доставки
                    </Heading>
                    <Spacer y={8} />
                    <UpcomingDeliveriesCarousel />
                </div>
                <Spacer y={16} />
                <div>
                    <Heading size="large" weight="bold">
                        Взять доставку
                    </Heading>
                </div>
                <MarketDateSelector typePicker="scroll" />
                <MarketFilterScrollable />
                <MarketContent />
            </MainContainer>
        </Layout>
    );
};
