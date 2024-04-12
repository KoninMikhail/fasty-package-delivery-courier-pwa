import { widgetsDeliveriesHistoryUi } from '@/widgets/deliveries/history';
import type { PropsWithChildren } from 'react';
import { useUnit } from 'effector-react';
import { UserCardRow } from '@/entities/user';
import { sessionModel } from '@/entities/viewer';
import { Link } from 'react-router-dom';
import { navbarItems } from '@/widgets/layout/navbar-desktop/data';
import { sharedUiBranding, sharedUiComponents } from '@/shared/ui';
import { translationNS } from '@/widgets/layout/navbar-desktop/config';
import { sharedConfigRoutes } from '@/shared/config';
import { useTranslation } from 'react-i18next';

const { DeliveriesHistoryList } = widgetsDeliveriesHistoryUi;
const { Menu, MenuItem } = sharedUiComponents;
const { Logo } = sharedUiBranding;
const { RouteName } = sharedConfigRoutes;
const { ROOT_PAGE } = RouteName;

const Root: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="mx-auto w-full max-w-[1400px]">{children}</div>
);

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col overflow-hidden">{children}</main>
);

const HistoryLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="relative block h-full overflow-y-auto">{children}</div>
);

const Toolbar: FunctionComponent<{ header: string }> = () => {
    const user = useUnit(sessionModel.$viewerProfileData);
    const { t } = useTranslation(translationNS);
    return (
        <header className="flex h-24 w-full items-center justify-between p-4">
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
                <UserCardRow user={user} avatarPosition="right" />
            </div>
        </header>
    );
};

const Headline: FunctionComponent = () => {
    return (
        <div className="flex items-center justify-between px-4 py-4">
            <h1 className="text-2xl font-bold">История доставок</h1>
        </div>
    );
};

export const DesktopMyDeliveriesHistoryView: FunctionComponent = () => {
    return (
        <Root>
            <Toolbar />
            <Headline />
            <MainContainer>
                <HistoryLayout>
                    <DeliveriesHistoryList />
                </HistoryLayout>
            </MainContainer>
        </Root>
    );
};
