import { PropsWithChildren, useState } from 'react';
import { useUnit } from 'effector-react';
import { UserCardRow } from '@/entities/user';
import { Spacer } from '@nextui-org/react';
import { sessionModel } from '@/entities/viewer';
import { widgetMyDeliveriesUi } from '@/widgets/deliveries/myDeliveries';
import {
    MyDeliveriesFilters,
    MyDeliveriesList,
} from '@/widgets/deliveries/myDeliveries/ui';
import { Link } from 'react-router-dom';
import { navbarItems } from '@/widgets/layout/navbar-desktop/data';
import { Logo } from '@/shared/ui/branding';
import { Menu, MenuItem } from '@/shared/ui/components';

import { sharedConfigRoutes } from '@/shared/config';

const { MyDeliveriesMap } = widgetMyDeliveriesUi;
const { RouteName } = sharedConfigRoutes;
const { ROOT_PAGE } = RouteName;

const Root: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="mx-auto w-[1400px]">{children}</div>
);

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="relative h-full w-full">{children}</main>
);

const ListSection: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="w-full px-8 ">
        <div className="relative block w-full">{children}</div>
    </div>
);

const Toolbar: FunctionComponent<{
    heading: string;
    onSelectTab: (key) => void;
}> = () => {
    const user = useUnit(sessionModel.$viewerProfileData);
    return (
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
                                    label={item.label}
                                />
                            );
                        }}
                    />
                </div>
                <div>
                    <UserCardRow user={user} avatarPosition="right" />
                </div>
            </div>
        </header>
    );
};

const Headline: FunctionComponent = () => {
    return (
        <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-bold">Мои доставки</h1>
        </div>
    );
};

export const DesktopMyDeliveriesPageView: FunctionComponent = () => {
    const [selectedTab, setSelectedTab] = useState<string>('list');

    const onSelectedTab = (key: string): void => {
        setSelectedTab(key);
    };

    return (
        <Root>
            <Toolbar heading="Мои доставки" onSelectTab={onSelectedTab} />
            <Spacer y={6} />
            <Headline />
            <Spacer y={6} />
            <MainContainer>
                {selectedTab === 'map' ? (
                    <MyDeliveriesMap />
                ) : (
                    <ListSection>
                        <MyDeliveriesFilters />
                        <Spacer y={6} />
                        <MyDeliveriesList />
                    </ListSection>
                )}
            </MainContainer>
        </Root>
    );
};
