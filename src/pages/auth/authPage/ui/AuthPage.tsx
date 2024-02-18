import {
    sharedConfigLocale,
    sharedConfigConstants,
    sharedConfigEnvs,
    sharedConfigRoutes,
} from '@/shared/config';

import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { PropsWithChildren, ReactNode } from 'react';
import { Button, Chip, Link, Spacer } from '@nextui-org/react';
import { ImKey } from 'react-icons/im';
import { useUnit } from 'effector-react';
import { FaGithub } from 'react-icons/fa6';

import { ChangeLanguageIconButton } from '@/features/viewer/changeLanguage';

import { widgetCookiePolicyModalUi } from '@/widgets/polices/cookie-policy-modal';
import { widgetResetPasswordModalUi } from '@/widgets/viewer/reset-password-modal';
import { widgetPrivacyPolicyModalUi } from '@/widgets/polices/privacy-policy-modal';
import { widgetSignInModalUi } from '@/widgets/viewer/sign-in-modal';
import { widgetTermsOfUseModalUi } from '@/widgets/polices/terms-of-use-modal';
import { viewerSessionModel } from '@/entities/viewer';

import { CompanyLogoIcon } from '@/shared/ui/icons/CompanyLogoIcon';

import { Navigate } from 'react-router-dom';
import { requestAuthModel, requestRecoveryModel } from '../model';
import { translationNS } from '../config';
import locale_ru from '../locales/ru.locale.json';
import locale_en from '../locales/en.locale.json';

const { locale } = sharedConfigLocale;
const { APP_NAME, GITHUB_PAGE_URL, APP_DESCRIPTION } = sharedConfigConstants;
const { isDevelopmentEnvironment } = sharedConfigEnvs;
const { RouteName } = sharedConfigRoutes;
const { SignInModal } = widgetSignInModalUi;

const { ResetPasswordModal } = widgetResetPasswordModalUi;
const { CookiePolicyModal } = widgetCookiePolicyModalUi;
const { PrivacyPolicyModal } = widgetPrivacyPolicyModalUi;
const { TermsOfUseModal } = widgetTermsOfUseModalUi;

/**
 * locale
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * Layout
 */
const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="h-dvh w-screen">
        <div className="absolute inset-0 h-full w-full bg-[url('/assets/images/auth_bg.jpg')] bg-cover bg-[left_-10rem_top] md:bg-center">
            <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-background from-45% to-transparent" />
            <div className="grid h-full w-full grid-cols-1 grid-rows-[auto_max-content]">
                {children}
            </div>
        </div>
    </div>
);
const Section: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="relative mx-auto w-full max-w-[500px] p-4">{children}</div>
);
const Navbar: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="flex items-center">{children}</div>
);
const NavbarBrand: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="flex flex-grow gap-2">{children}</div>
);
const NavbarTools: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="flex gap-2">{children}</div>
);

/**
 * Components
 */
const Greetings: FunctionComponent<{
    headline: string;
    description: string;
}> = ({ headline, description }): ReactNode => (
    <div className="relative">
        <h1 className="text-2xl font-bold">{headline}</h1>
        <Spacer y={2} />
        <div>
            <p>{description}</p>
        </div>
    </div>
);
const Logo: FunctionComponent<{
    headline: string;
    description: string;
}> = ({ headline, description }) => {
    return (
        <div className="flex place-content-start items-center gap-2">
            <div>
                <CompanyLogoIcon className="text-5xl" width="0.7em" />
            </div>
            <div>
                <div className="font-bold drop-shadow-xl">{headline}</div>
                <div className="text-xs">{description}</div>
            </div>
        </div>
    );
};
const SignInButton: FunctionComponent<{
    label: string;
    onPress: () => void;
}> = ({ label, onPress }) => (
    <Button color="primary" fullWidth size="lg" radius="full" onPress={onPress}>
        <ImKey /> {label}
    </Button>
);
const ResetPasswordButton: FunctionComponent<{
    label: string;
    onPress: () => void;
}> = ({ label, onPress }) => (
    <Button fullWidth size="lg" radius="full" onPress={onPress}>
        {label}
    </Button>
);

const GitHubButton: FunctionComponent<{
    label: string;
    href: string;
}> = ({ label, href }) => (
    <Button
        isExternal
        as={Link}
        href={href}
        variant="light"
        fullWidth
        size="lg"
        radius="full"
    >
        <FaGithub /> {label}
    </Button>
);

const DeveloperModeChip: FunctionComponent = () => (
    <Chip color="warning" size="sm" className="mb-2">
        Developer Mode
    </Chip>
);

const AppVersion: FunctionComponent = () => (
    <div className="invisible fixed bottom-8 right-12 text-center lg:visible">
        <span className="text-foreground">
            {import.meta.env.PACKAGE_VERSION}
        </span>
    </div>
);

/**
 * @name AuthPage
 * @description Page for deliveries exchange
 * @constructor
 */
export const AuthPage: FunctionComponent = () => {
    /**
     * Translation
     */
    const { t, i18n } = useTranslation(translationNS);
    const currentLanguage = i18n.language as keyof typeof APP_DESCRIPTION;

    /**
     * Page
     */
    const pageTitle = `${t('page.title')} | ${APP_NAME} - ${APP_DESCRIPTION[currentLanguage]}`;
    useDocumentTitle(pageTitle);

    /**
     * Handlers
     */
    const onPressSignIn = useUnit(requestAuthModel.pressSignInButton);
    const onPressCookiePolicy = useUnit(
        requestAuthModel.pressOpenCookiePolicyLink,
    );
    const onPressPrivacyPolicy = useUnit(
        requestAuthModel.pressOpenPrivacyPolicyLink,
    );
    const onPressTermsOfUse = useUnit(requestAuthModel.pressOpenTermsOfUseLink);
    const onPressResetPassword = useUnit(
        requestRecoveryModel.pressRecoveryButton,
    );

    /**
     * Redirect
     */
    const session = useUnit(viewerSessionModel.$session);
    if (session) return <Navigate to={RouteName.ROOT_PAGE} replace />;

    return (
        <>
            <Layout>
                <Section>
                    <Navbar>
                        <NavbarBrand>
                            <Logo
                                headline={APP_NAME}
                                description={t('app.description')}
                            />
                        </NavbarBrand>
                        <NavbarTools>
                            <ChangeLanguageIconButton />
                        </NavbarTools>
                    </Navbar>
                </Section>
                <Section>
                    {isDevelopmentEnvironment ? <DeveloperModeChip /> : null}
                    <Greetings
                        headline={t('greetings.welcome')}
                        description={t('greetings.description')}
                    />
                    <Spacer y={8} />
                    <SignInButton
                        label={t('buttons.sign_in')}
                        onPress={onPressSignIn}
                    />
                    <Spacer y={2} />
                    <ResetPasswordButton
                        label={t('buttons.reset_password')}
                        onPress={onPressResetPassword}
                    />
                    <Spacer y={2} />
                    <GitHubButton
                        label={t('buttons.github')}
                        href={GITHUB_PAGE_URL}
                    />
                    <Spacer y={1} />
                </Section>
            </Layout>
            <SignInModal
                onClickCookiesPolicyLink={onPressCookiePolicy}
                onClickPrivacyPolicyLink={onPressPrivacyPolicy}
                onClickTermsOfUseLink={onPressTermsOfUse}
            />
            <ResetPasswordModal />
            <CookiePolicyModal size="5xl" />
            <PrivacyPolicyModal size="5xl" />
            <TermsOfUseModal size="5xl" />
            <AppVersion />
        </>
    );
};
