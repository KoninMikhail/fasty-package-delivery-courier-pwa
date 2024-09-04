import type { PropsWithChildren } from 'react';
import { Spacer } from '@nextui-org/react';
import { widgetNavbarDesktopUi } from '@/widgets/layout/navbar-desktop';
import { DetectDeviceType } from '@/features/device/detecDeviceType';
import { AvatarTool, PageTitle, PasswordTool, PersonalInfo } from '../common';

const { Navbar } = widgetNavbarDesktopUi;
/**
 * ===================
 * Layout
 * ===================
 */
const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="grid h-screen w-screen grid-cols-[max-content_auto] overflow-hidden">
        {children}
    </div>
);
const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col overflow-y-scroll px-8">
        {children}
    </main>
);

/**
 * ===================
 * Components
 * ===================
 */
const Toolbar: FunctionComponent = () => {
    return (
        <div className="flex w-full items-center justify-between py-6 pr-4">
            <h1 className="text-4xl">
                <PageTitle />
            </h1>
        </div>
    );
};

/**
 * @name DesktopProfileEditPageView
 * @description Page for deliveries exchange
 */
export const DesktopProfileEditPageView: FunctionComponent = () => {
    return (
        <>
            <Layout>
                <Navbar />
                <MainContainer>
                    <Toolbar />
                    <Spacer y={5} />
                    <AvatarTool />
                    <Spacer y={8} />
                    <PersonalInfo />
                    <Spacer y={8} />
                    <PasswordTool />
                    <Spacer y={24} />
                </MainContainer>
            </Layout>
            <DetectDeviceType.GuardAppVersion />
        </>
    );
};
