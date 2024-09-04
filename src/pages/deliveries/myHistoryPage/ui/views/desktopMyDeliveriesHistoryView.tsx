import { widgetsDeliveriesHistoryUi } from '@/widgets/deliveries/history';
import type { PropsWithChildren } from 'react';
import { widgetNavbarDesktopUi } from '@/widgets/layout/navbar-desktop';
import { useUnit } from 'effector-react';
import { UserCardRow } from '@/entities/user';
import { sessionModel } from '@/entities/viewer';
import { DetectDeviceType } from '@/features/device/detecDeviceType';

const { Navbar } = widgetNavbarDesktopUi;
const { DeliveriesHistoryList } = widgetsDeliveriesHistoryUi;

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="grid h-screen w-screen grid-cols-[max-content_auto] gap-8">
        {children}
    </div>
);

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full max-h-screen w-full flex-col overflow-hidden pb-24">
        {children}
    </main>
);

const HistoryLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="relative block h-full overflow-y-auto">{children}</div>
);

const Toolbar: FunctionComponent<{ header: string }> = ({ header }) => {
    const user = useUnit(sessionModel.$viewerProfileData);
    return (
        <div className="flex w-full items-center justify-between py-6 pr-4 ">
            <div className="w-1/2">
                <h1 className="text-4xl">{header}</h1>
            </div>
            <div>
                <UserCardRow user={user} avatarPosition="right" />
            </div>
        </div>
    );
};

export const DesktopMyDeliveriesHistoryView: FunctionComponent<{
    header: string;
}> = ({ header }) => {
    return (
        <>
            <Layout>
                <Navbar />
                <MainContainer>
                    <Toolbar header={header} />
                    <HistoryLayout>
                        <DeliveriesHistoryList />
                    </HistoryLayout>
                </MainContainer>
            </Layout>
            <DetectDeviceType.GuardAppVersion />
        </>
    );
};
