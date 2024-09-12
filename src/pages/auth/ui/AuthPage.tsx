import { sharedConfigConstants, sharedConfigEnvs } from '@/shared/config';

import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { PropsWithChildren } from 'react';
import { Button, Chip, Link, Spacer } from '@nextui-org/react';
import { ImKey } from 'react-icons/im';
import { useGate, useUnit } from 'effector-react';
import { FaGithub } from 'react-icons/fa6';

import { widgetCookiePolicyModalUi } from '@/widgets/polices/cookiePolicyModal';
import { widgetResetPasswordModalUi } from '@/widgets/viewer/reset-password-modal';
import { widgetPrivacyPolicyModalUi } from '@/widgets/polices/privacyPolicyModal';
import { widgetSignInModalUi } from '@/widgets/viewer/sign-in-modal';
import { widgetTermsOfUseModalUi } from '@/widgets/polices/termsOfUseModal';
import { sharedUiBranding } from '@/shared/ui/';

import { Guest } from '@/entities/viewer/ui/Guest';
import { ChangeLanguage } from '@/features/viewer/changeLanguage';
import {
    AuthPageGate,
    pressRecoveryButton,
    pressSignInButton,
} from '../model/model';
import {
    BUTTON_GITHUB,
    BUTTON_RESET_PASSWORD,
    BUTTON_SIGN_IN,
    GREETINGS_DESCRIPTION,
    GREETINGS_WELCOME,
    PAGE_TITLE,
    translationNS,
} from '../config/locale';

const { APP_NAME, GITHUB_PAGE_URL, APP_DESCRIPTION, APP_VERSION } =
    sharedConfigConstants;
const { isDevelopmentEnvironment } = sharedConfigEnvs;

const { Logo } = sharedUiBranding;
const { SignInModal } = widgetSignInModalUi;
const { ResetPasswordModal } = widgetResetPasswordModalUi;
const { CookiePolicyModal } = widgetCookiePolicyModalUi;
const { PrivacyPolicyModal } = widgetPrivacyPolicyModalUi;
const { TermsOfUseModal } = widgetTermsOfUseModalUi;

/**
 * Layout
 */
const Root: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="h-dvh w-screen">
        <div className="absolute inset-0 h-full w-full bg-[url('/assets/images/auth_bg.jpg')] bg-cover bg-[left_-10rem_top] md:bg-center">
            <div className="absolute top-0 h-24 w-full bg-gradient-to-b from-background from-45% to-transparent opacity-25" />
            <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-background from-45% to-transparent opacity-85" />
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
const Greetings: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="relative">
            <h1 className="text-2xl font-bold">{t(GREETINGS_WELCOME)}</h1>
            <Spacer y={2} />
            <div>
                <p>{t(GREETINGS_DESCRIPTION)}</p>
            </div>
        </div>
    );
};

const SignInButton: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const onPressSignIn = useUnit(pressSignInButton);
    return (
        <Button
            color="primary"
            fullWidth
            size="lg"
            radius="full"
            onPress={onPressSignIn}
        >
            <ImKey /> {t(BUTTON_SIGN_IN)}
        </Button>
    );
};
const ResetPasswordButton: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const onPressResetPassword = useUnit(pressRecoveryButton);
    return (
        <Button
            fullWidth
            size="lg"
            radius="full"
            onPress={onPressResetPassword}
        >
            {t(BUTTON_RESET_PASSWORD)}
        </Button>
    );
};

const GitHubButton: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <Button
            isExternal
            as={Link}
            href={GITHUB_PAGE_URL}
            variant="light"
            fullWidth
            size="lg"
            radius="full"
        >
            <FaGithub /> {t(BUTTON_GITHUB)}
        </Button>
    );
};

const DeveloperModeChip: FunctionComponent = () => (
    <Chip color="warning" size="sm" className="mb-2">
        Developer Mode
    </Chip>
);

const AppVersionLabel: FunctionComponent = () => (
    <div className="invisible fixed bottom-8 right-12 text-center lg:visible">
        <span className="text-foreground">{APP_VERSION}</span>
    </div>
);

export const AuthPage: FunctionComponent = () => {
    const { t, i18n } = useTranslation(translationNS);
    const currentLanguage = i18n.language as keyof typeof APP_DESCRIPTION;

    useDocumentTitle(
        t(PAGE_TITLE, {
            appName: APP_NAME,
            appDescription: APP_DESCRIPTION[currentLanguage],
        }),
    );

    useGate(AuthPageGate);

    return (
        <Guest>
            <Root>
                <Section>
                    <Navbar>
                        <NavbarBrand>
                            <Logo />
                        </NavbarBrand>
                        <NavbarTools>
                            <ChangeLanguage.IconButton />
                        </NavbarTools>
                    </Navbar>
                </Section>
                <Section>
                    {isDevelopmentEnvironment ? <DeveloperModeChip /> : null}
                    <Greetings />
                    <Spacer y={8} />
                    <SignInButton />
                    <Spacer y={2} />
                    <ResetPasswordButton />
                    <Spacer y={2} />
                    <GitHubButton />
                    <Spacer y={1} />
                </Section>
            </Root>
            <SignInModal />
            <ResetPasswordModal />
            <CookiePolicyModal size="5xl" />
            <PrivacyPolicyModal size="5xl" />
            <TermsOfUseModal size="5xl" />
            <AppVersionLabel />
        </Guest>
    );
};
