import { sharedConfigLocale, sharedConfigConstants } from '@/shared/config';

import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';

import { PropsWithChildren, ReactNode } from 'react';
import { Button, Spacer } from '@nextui-org/react';
import { CompanyLogoIcon } from '@/shared/ui/icons/CompanyLogoIcon';
import { SwitchLanguage } from '@/features/system/switchAppLanguage/ui';
import {
    widgetResetUserPasswordModalUi,
    widgetResetUserPasswordModalModel,
} from '@/widgets/session/reset-user-password-modal';

import {
    widgetAuthUserModalUi,
    widgetAuthUserModalModel,
} from '@/widgets/session/auth-user-modal';
import { ImKey } from 'react-icons/im';

import { useUnit } from 'effector-react';
import { translationNS } from '../config';
import locale_ru from '../locales/ru.locale.json';
import locale_en from '../locales/en.locale.json';

const { locale } = sharedConfigLocale;
const { APP_NAME } = sharedConfigConstants;
const { AuthUserByEmailModal } = widgetAuthUserModalUi;
const { ResetPasswordModal } = widgetResetUserPasswordModalUi;

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

/**
 * @name AuthPage
 * @description Page for deliveries exchange
 * @constructor
 */
export const AuthPage: FunctionComponent = () => {
    /**
     * Translation
     */
    const { t } = useTranslation(translationNS);

    /**
     * Page
     */
    const pageTitle = `${t('page_title')} | ${APP_NAME} - `;
    useDocumentTitle(pageTitle);

    /*
     * Modal
     */
    const [callAuthModal] = useUnit([widgetAuthUserModalModel.callAuthModal]);
    const [callResetModal] = useUnit([
        widgetResetUserPasswordModalModel.callResetModal,
    ]);

    /**
     * Handlers
     */
    const onPressSignIn = (): void => {
        callAuthModal();
    };

    const onPressResetPassword = (): void => {
        callResetModal();
    };

    return (
        <>
            <Layout>
                <Section>
                    <div className="flex items-center">
                        <div className="flex-grow">
                            <Logo
                                headline={APP_NAME}
                                description={t('app.description')}
                            />
                        </div>
                        <div>
                            <SwitchLanguage />
                        </div>
                    </div>
                </Section>
                <Section>
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
                    <Spacer y={1} />
                </Section>
            </Layout>
            <AuthUserByEmailModal />
            <ResetPasswordModal />
        </>
    );
};
