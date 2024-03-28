import { widgetsDeliveriesHistoryUi } from '@/widgets/deliveries/history';
import type { PropsWithChildren } from 'react';
import { widgetNavbarUi } from '@/widgets/layout/navbar-desktop';
import { useUnit } from 'effector-react';
import { UserCardRow } from '@/entities/user';
import { sessionModel } from '@/entities/viewer';

const { Navbar } = widgetNavbarUi;
const { DeliveriesHistoryList } = widgetsDeliveriesHistoryUi;

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="grid h-screen w-screen grid-cols-[max-content_auto] gap-8">
        {children}
    </div>
);

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col overflow-hidden">{children}</main>
);

const HistoryLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="relative block h-full overflow-y-auto">{children}</div>
);

const Toolbar: FunctionComponent<{ header: string }> = ({ header }) => {
    const user = useUnit(sessionModel.$sessionStore);
    return (
        <div className="flex w-full items-center justify-between py-6 pr-4">
            <div className="w-1/2">
                <h1 className="text-4xl">{header}</h1>
            </div>
            <div>
                <UserCardRow account={user} avatarPosition="right" />
            </div>
        </div>
    );
};

export const DesktopMyDeliveriesHistoryView: FunctionComponent<{
    header: string;
}> = ({ header }) => {
    return (
        <Layout>
            <Navbar />
            <MainContainer>
                <Toolbar header={header} />
                <HistoryLayout>
                    <DeliveriesHistoryList />
                </HistoryLayout>
            </MainContainer>
        </Layout>
    );
};
