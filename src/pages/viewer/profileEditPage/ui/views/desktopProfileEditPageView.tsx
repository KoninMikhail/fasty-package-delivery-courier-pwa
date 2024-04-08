import type { PropsWithChildren } from 'react';
import { Divider, Spacer } from '@nextui-org/react';
import { widgetNavbarDesktopUi } from '@/widgets/layout/navbar-desktop';
import { useUnit } from 'effector-react';
import { sessionModel } from '@/entities/viewer';
import { PageTitle } from '../common';

const { Navbar } = widgetNavbarDesktopUi;

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="grid h-screen w-screen grid-cols-[max-content_auto] gap-8">
        {children}
    </div>
);

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col">{children}</main>
);

const Toolbar: FunctionComponent = () => {
    return (
        <div className="flex w-full items-center justify-between py-6 pr-4">
            <h1 className="text-4xl capitalize">
                <PageTitle />
            </h1>
        </div>
    );
};

export const DesktopProfileEditPageView: FunctionComponent = () => {
    const user = useUnit(sessionModel.$viewerProfileData);
    return (
        <Layout>
            <Navbar />
            <MainContainer>
                <Toolbar header="sd" user={user} />
                <Spacer />
                <Divider />
                <Spacer />
                <div>
                    <div>cvtybn fdfnfh</div>
                    <div>lfyyst j ct,t </div>
                    <div>gfhjkm</div>
                </div>
                <Spacer />
                <Divider />
            </MainContainer>
        </Layout>
    );
};
