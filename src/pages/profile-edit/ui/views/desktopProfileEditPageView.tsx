import type { PropsWithChildren } from 'react';
import { Spacer } from '@nextui-org/react';
import { widgetNavbarDesktopUi } from '@/widgets/layout/navbar-desktop';
import { widgetSelectAvatarUi } from '@/widgets/viewer/select-avatar';
import { widgetPersonalInfoUi } from '@/widgets/viewer/personal-info';
import { useTranslation } from 'react-i18next';
import {
    CHANGE_PASSWORD_DESCRIPTION,
    CHANGE_PASSWORD_LABEL,
    PAGE_HEADING,
    translationNS,
} from '@/pages/viewer/profileEditPage/config';
import { widgetSelectPasswordUi } from '@/widgets/viewer/select-password';

const { Navbar } = widgetNavbarDesktopUi;
const { SelectAvatarRow } = widgetSelectAvatarUi;
const { PersonalInfo } = widgetPersonalInfoUi;
const { SelectPassword } = widgetSelectPasswordUi;

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
    const { t } = useTranslation(translationNS);
    return (
        <div className="flex w-full items-center justify-between py-6 pr-4">
            <h1 className="text-4xl">{t(PAGE_HEADING)}</h1>
        </div>
    );
};

const PasswordTool: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <div>
            <h2 className="text-xl font-bold">{t(CHANGE_PASSWORD_LABEL)}</h2>
            <Spacer y={2} />
            <p className="text-sm">{t(CHANGE_PASSWORD_DESCRIPTION)}</p>
            <Spacer y={4} />
            <div className="flex flex-col gap-4">
                <SelectPassword />
            </div>
        </div>
    );
};

/**
 * @name DesktopProfileEditPageView
 * @description Page for deliveries exchange
 */
export const DesktopProfileEditPageView: FunctionComponent = () => {
    return (
        <Layout>
            <Navbar />
            <MainContainer>
                <Toolbar />
                <Spacer y={5} />
                <SelectAvatarRow />
                <Spacer y={8} />
                <PersonalInfo />
                <Spacer y={8} />
                <PasswordTool />
                <Spacer y={24} />
            </MainContainer>
        </Layout>
    );
};
