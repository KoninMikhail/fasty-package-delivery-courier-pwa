import type { PropsWithChildren } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { Divider, Spacer } from '@nextui-org/react';
import { DetectDeviceType } from '@/features/device/detecDeviceType';
import {
    AvatarTool,
    BackButton,
    PageTitle,
    PasswordTool,
    PersonalInfo,
} from '../common';

const { NavbarMobile } = widgetNavbarMobileUi;

/**
 * ===================
 * Layout
 * ===================
 */
const Content: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col px-4 lg:mx-auto lg:w-[750px]">
        {children}
    </main>
);

/**
 * ===================
 * Components
 * ===================
 */
const Header: FunctionComponent = () => (
    <header className="flex w-full items-center px-4 pt-4">
        <h1 className="flex-grow truncate text-xl font-bold">
            <PageTitle />
        </h1>
        <div className="flex-shrink">
            <BackButton />
        </div>
    </header>
);

/**
 * @name MobileProfileEditPageView
 * @description Page for deliveries exchange
 * @constructor
 */
export const MobileProfileEditPageView: FunctionComponent = () => {
    return (
        <>
            <Header />
            <Spacer y={4} className="px-4" />
            <Divider />
            <Spacer y={8} />
            <Content>
                <AvatarTool />
                <Spacer y={8} />
                <PersonalInfo />
                <Spacer y={8} />
                <PasswordTool />
                <Spacer y={24} />
            </Content>
            <NavbarMobile />
            <DetectDeviceType.GuardAppVersion />
        </>
    );
};
