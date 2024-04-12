import { PropsWithChildren } from 'react';
import { widgetNavbarDesktopUi } from '@/widgets/layout/navbar-desktop';
import { useUnit } from 'effector-react';
import { UserCardRow } from '@/entities/user';
import { sessionModel } from '@/entities/viewer';
import { Button, Chip, Divider, Link, Spacer } from '@nextui-org/react';
import { CompanyLogoIcon } from '@/shared/ui/icons/CompanyLogoIcon';
import { ChangeLanguageButton } from '@/features/viewer/changeLanguage';
import { ChangeColorModeSwitchButton } from '@/features/viewer/changeColorMode';
import { UpcomingItemsCountDropdown } from '@/features/viewer/setHomeUpcommingCount';
import {
    PageTitle,
    SectionHelpSupportTitle,
    SectionLegalTitle,
    SettingsNotice,
    TermsOfUseButtonText,
    PrivacyPolicyButtonText,
    CookiesPolicyButtonText,
} from '@/pages/viewer/settingsPage/ui/common';
import {
    APP_DESCRIPTION,
    APP_NAME,
    APP_SUPPORT_EMAIL,
    APP_SUPPORT_PHONE,
} from '@/shared/config/constants';
import { AppVersion } from '@/shared/lib/app';
import { useTranslation } from 'react-i18next';
import { translationNS } from '@/pages/viewer/settingsPage/config';
import { widgetCookiePolicyModalUi } from '@/widgets/polices/cookiePolicyModal';
import { widgetPrivacyPolicyModalUi } from '@/widgets/polices/privacyPolicyModal';
import { widgetTermsOfUseModalUi } from '@/widgets/polices/termsOfUseModal';

import {
    pressOpenCookiePolicyLink,
    pressOpenPrivacyPolicyLink,
    pressOpenTermsOfUseLink,
} from '@/pages/viewer/settingsPage/model';

const { Navbar } = widgetNavbarDesktopUi;
const { CookiePolicyModal } = widgetCookiePolicyModalUi;
const { PrivacyPolicyModal } = widgetPrivacyPolicyModalUi;
const { TermsOfUseModal } = widgetTermsOfUseModalUi;

/**
 * =======================
 * Layout
 * =====================
 */
const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="grid h-screen w-screen grid-cols-[max-content_auto]">
        {children}
    </div>
);

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col px-8">{children}</main>
);
const Section: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <section className="grid gap-4 p-2">{children}</section>
);

/**
 *
 * =======================
 * Components
 * =======================
 */
const Toolbar: FunctionComponent = () => {
    const user = useUnit(sessionModel.$viewerProfileData);
    return (
        <div className="flex w-full items-center justify-between py-6 pr-4">
            <div className="w-1/2">
                <h1 className="text-4xl capitalize">
                    <PageTitle />
                </h1>
            </div>
            <div>
                <UserCardRow user={user} avatarPosition="right" />
            </div>
        </div>
    );
};

const ContactLinks: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <>
            <div className="flex items-center justify-between gap-2">
                <div className="flex-grow">{t('Телефон')}</div>
                <div>{APP_SUPPORT_PHONE}</div>
            </div>
            <div className="flex items-center justify-between gap-2">
                <div className="flex-grow">{t('Эл. почта')}</div>
                <Link href={`mailto:${APP_SUPPORT_PHONE}`}>
                    {APP_SUPPORT_EMAIL}
                </Link>
            </div>
        </>
    );
};

const LegalLinks: FunctionComponent = () => {
    const onPressCookiePolicy = useUnit(pressOpenCookiePolicyLink);
    const onPressPrivacyPolicy = useUnit(pressOpenPrivacyPolicyLink);
    const onPressTermsOfUse = useUnit(pressOpenTermsOfUseLink);
    return (
        <>
            <div className="flex items-center gap-2">
                <div className="flex-grow">
                    <Button
                        onClick={onPressCookiePolicy}
                        color="primary"
                        variant="flat"
                        fullWidth
                    >
                        <CookiesPolicyButtonText />
                    </Button>
                </div>
                <div className="flex-grow">
                    <Button
                        onClick={onPressPrivacyPolicy}
                        color="primary"
                        variant="flat"
                        fullWidth
                    >
                        <PrivacyPolicyButtonText />
                    </Button>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex-grow">
                    <Button
                        onClick={onPressTermsOfUse}
                        color="primary"
                        variant="flat"
                        fullWidth
                    >
                        <TermsOfUseButtonText />
                    </Button>
                </div>
            </div>
        </>
    );
};

/**
 * @name DesktopSettingsPageView
 * @description Page for settings
 */
export const DesktopSettingsPageView: FunctionComponent = () => {
    const { t, i18n } = useTranslation(translationNS);
    const currentLanguage = i18n.language as keyof typeof APP_DESCRIPTION;
    return (
        <Layout>
            <Navbar />
            <MainContainer>
                <Toolbar />
                <div className="flex w-full flex-col justify-center gap-1 py-4">
                    <div className="flex w-full justify-center">
                        <CompanyLogoIcon className="py-4 text-9xl" />
                    </div>
                    <Spacer />
                    <div className="flex w-full items-center justify-center gap-1 text-center text-lg">
                        <span className=" font-bold">{APP_NAME}</span>
                        <Chip size="sm">
                            <AppVersion />
                        </Chip>
                    </div>
                    <div className="w-full text-center text-xs">
                        {APP_DESCRIPTION[currentLanguage]}
                    </div>
                </div>
                <Spacer />
                <Divider />
                <Spacer />
                <Section>
                    <div className="flex items-center gap-2">
                        <div className="flex-grow">{t('language.title')}</div>
                        <div>
                            <ChangeLanguageButton />
                        </div>
                    </div>
                </Section>
                <Section>
                    <div className="flex items-center gap-2">
                        <div className="flex-grow">{t('theme.title')}</div>
                        <div>
                            <ChangeColorModeSwitchButton />
                        </div>
                    </div>
                </Section>
                <Section>
                    <div className="flex items-center gap-2">
                        <div className="flex-grow">
                            {t('setting.upcoming.items.count')}
                        </div>
                        <div>
                            <UpcomingItemsCountDropdown />
                        </div>
                    </div>
                </Section>
                <Spacer />
                <Section>
                    <p className="text-xs text-danger-400">
                        <SettingsNotice />
                    </p>
                </Section>
                <Spacer y={2} />
                <Divider />
                <Spacer y={2} />
                <Section>
                    <div className="w-full font-bold">
                        <SectionHelpSupportTitle />
                    </div>
                    <ContactLinks />
                </Section>
                <Spacer y={2} />
                <Divider />
                <Spacer y={2} />
                <Section>
                    <div className="flex flex-col gap-2">
                        <div className="mb-2 w-full font-bold">
                            <SectionLegalTitle />
                        </div>
                    </div>
                    <LegalLinks />
                </Section>
            </MainContainer>
            <CookiePolicyModal size="5xl" />
            <PrivacyPolicyModal size="5xl" />
            <TermsOfUseModal size="5xl" />
        </Layout>
    );
};
