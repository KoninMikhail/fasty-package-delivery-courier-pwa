import { PropsWithChildren, useState } from 'react';
import { widgetFooterUi } from '@/widgets/layout/footer';
import { widgetNavbarUi } from '@/widgets/layout/navbar-desktop';
import { useUnit } from 'effector-react';
import { UserCardRow } from '@/entities/user';
import { sessionModel } from '@/entities/viewer';
import { useTranslation } from 'react-i18next';
import { Spacer, Tab, Tabs } from '@nextui-org/react';
import { Route } from '@/entities/route';
import { deliveriesMapModel } from '@/pages/deliveries/myActiveDeliveriesPage/model/model';
import { translationNS } from '../../config';

const { Footer } = widgetFooterUi;
const { Navbar } = widgetNavbarUi;

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="relative grid h-screen w-screen grid-cols-[max-content_auto]">
        {children}
    </div>
);

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col p-6">{children}</main>
);

const Toolbar: FunctionComponent<{ heading: string }> = ({ heading }) => {
    const { t } = useTranslation(translationNS);
    const user = useUnit(sessionModel.$sessionStore);
    return (
        <div className="flex w-full items-center justify-between px-6 pr-4">
            <div className="w-1/2">
                <h1 className="text-4xl">{heading}</h1>
            </div>
            <div>
                <UserCardRow account={user} avatarPosition="right" />
            </div>
        </div>
    );
};

export const DesktopProfilePageView: FunctionComponent<{
    heading: string;
}> = ({ heading }) => {
    const [selectedTab, setSelectedTab] = useState('list');

    return (
        <Layout>
            <Navbar />
            <MainContainer>
                <Toolbar heading={heading} />
                <div className="p-6">
                    <div className="flex">
                        <Tabs
                            key="lg"
                            size="md"
                            radius="full"
                            onSelectionChange={(index) => {
                                setSelectedTab(index);
                            }}
                            aria-label="Tabs sizes"
                        >
                            <Tab key="list" title="Списком" />
                            <Tab key="map" title="На карте" />
                        </Tabs>
                    </div>
                    <Spacer y={6} />
                    <div className="h-full w-full">
                        <Route.Map.Container
                            model={deliveriesMapModel}
                            className="block h-96 w-full"
                        />
                    </div>
                </div>
            </MainContainer>
        </Layout>
    );
};
