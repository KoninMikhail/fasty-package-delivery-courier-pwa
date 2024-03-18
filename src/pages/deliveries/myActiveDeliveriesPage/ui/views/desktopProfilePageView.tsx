import type { PropsWithChildren } from 'react';
import { widgetFooterUi } from '@/widgets/layout/footer';
import { widgetNavbarUi } from '@/widgets/layout/navbar-desktop';
import { useUnit } from 'effector-react';
import { UserCardRow } from '@/entities/user';
import { sessionModel } from '@/entities/viewer';
import { useTranslation } from 'react-i18next';
import { translationNS } from '../../config';

const { Footer } = widgetFooterUi;
const { Navbar } = widgetNavbarUi;

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="grid h-screen w-screen grid-cols-[max-content_auto] gap-8">
        {children}
    </div>
);

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col">{children}</main>
);

const Toolbar: FunctionComponent<{ heading: string }> = ({ heading }) => {
    const { t } = useTranslation(translationNS);
    const user = useUnit(sessionModel.$sessionStore);
    return (
        <div className="flex w-full items-center justify-between py-6 pr-4">
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
    return (
        <Layout>
            <Navbar />
            <MainContainer>
                <Toolbar heading={heading} />
            </MainContainer>
        </Layout>
    );
};
