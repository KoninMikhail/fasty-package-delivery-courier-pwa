import { PropsWithChildren, useState } from 'react';
import { widgetNavbarDesktopUi } from '@/widgets/layout/navbar-desktop';
import { useUnit } from 'effector-react';
import { UserCardRow } from '@/entities/user';
import { useTranslation } from 'react-i18next';
import { Spacer, Tab, Tabs, Key } from '@nextui-org/react';
import { sessionModel } from '@/entities/viewer';
import { widgetMyDeliveriesUi } from '@/widgets/deliveries/myDeliveries';
import {
    MyDeliveriesFilters,
    MyDeliveriesList,
} from '@/widgets/deliveries/myDeliveries/ui';
import { translationNS } from '../../config';

const { MyDeliveriesMap } = widgetMyDeliveriesUi;
const { Navbar } = widgetNavbarDesktopUi;

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="relative grid h-screen w-screen grid-cols-[max-content_auto] overflow-hidden">
        {children}
    </div>
);

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="relative h-full w-full flex-col overflow-hidden overflow-y-scroll">
        {children}
    </main>
);

const MapSection: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="z-[6000]">{children}</div>
);

const ListSection: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="h-inherit w-full overflow-hidden px-8">
        <div className="relative block w-full pt-16 ">{children}</div>
    </div>
);

const Toolbar: FunctionComponent<{
    heading: string;
    onSelectTab: (key: Key) => void;
}> = ({ heading, onSelectTab }) => {
    const { t } = useTranslation(translationNS);
    const user = useUnit(sessionModel.$viewerProfileData);
    return (
        <div className="sticky left-0 right-0 top-6 z-[7000] flex items-center justify-between px-8">
            <h1 className="text-4xl">{heading}</h1>
            <div>
                <Tabs
                    key="lg"
                    size="md"
                    radius="full"
                    onSelectionChange={onSelectTab}
                    aria-label="Tabs sizes"
                >
                    <Tab key="list" title="Списком" />
                    <Tab key="map" title="На карте" />
                </Tabs>
            </div>
            <div>
                <UserCardRow user={user} avatarPosition="right" />
            </div>
        </div>
    );
};

export const DesktopMyDeliveriesPageView: FunctionComponent = () => {
    const [selectedTab, setSelectedTab] = useState('list');

    const onSelectedTab = (key: Key) => {
        setSelectedTab(key);
    };

    return (
        <Layout>
            <Navbar />
            <MainContainer>
                <Toolbar heading="Мои доставки" onSelectTab={onSelectedTab} />
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
        </Layout>
    );
};
