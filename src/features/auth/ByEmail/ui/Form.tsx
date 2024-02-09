import { useUnit } from 'effector-react';
import { modelView } from 'effector-factorio';

import { ChangeEvent, useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { sharedConfigLocale } from '@/shared/config';
import { useTranslation } from 'react-i18next';
import { sharedUiIcons } from '@/shared/ui';
import { factory } from '../model/model';

import { translationNS } from '../config';
import locale_en from '../locales/en.locale.json';
import locale_ru from '../locales/ru.locale.json';

const { locale } = sharedConfigLocale;
const { EyeSlashFilledIcon, EyeFilledIcon } = sharedUiIcons;

/**
 * Constants
 */
const EMAIL_LABEL_TEXT_KEY = 'email.label';
const EMAIL_PLACEHOLDER_TEXT_KEY = 'email.placeholder';
const PASSWORD_LABEL_TEXT_KEY = 'password.label';
const PASSWORD_PLACEHOLDER_TEXT_KEY = 'password.placeholder';
const PASSWORD_VALIDATION_RULES_TEXT_KEY = 'password.validation.rules';
const SIGN_IN_TEXT_KEY = 'signIn';

/**
 * locale
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * Components
 */
const EmailField: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const model = factory.useModel();

    const value = useUnit(model.$login);

    /**
     * Error
     */
    const [isInvalid, errorMessage] = useUnit([
        model.$fail,
        model.$failMessage,
    ]);

    /**
     * Handlers
     */
    const onStateChangeHandler = (
        event_: ChangeEvent<HTMLInputElement>,
    ): void => {
        model.loginChanged(event_.target.value);
    };
    const onClearHandler = (): void => {
        model.loginChanged('');
    };

    return (
        <Input
            isRequired
            isClearable
            isInvalid={isInvalid}
            errorMessage={t(errorMessage)}
            label={t(EMAIL_LABEL_TEXT_KEY)}
            placeholder={t(EMAIL_PLACEHOLDER_TEXT_KEY)}
            variant="flat"
            value={value}
            onChange={onStateChangeHandler}
            onClear={onClearHandler}
        />
    );
};

const PasswordField: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const model = factory.useModel();

    const value = useUnit(model.$password);

    /**
     * Error
     */
    const [isInvalid, errorMessage] = useUnit([
        model.$fail,
        model.$failMessage,
    ]);

    /**
     * Handlers
     */
    const onStateChangeHandler = (
        event_: ChangeEvent<HTMLInputElement>,
    ): void => {
        model.passwordChanged(event_.target.value);
    };

    /**
     * Show/Hide password
     */
    const [isVisible, setIsVisible] = useState(false);
    const onToggleVisibility = (): void => setIsVisible(!isVisible);

    return (
        <Input
            isRequired
            type={isVisible ? 'text' : 'password'}
            variant="flat"
            isInvalid={isInvalid}
            errorMessage={t(errorMessage)}
            value={value}
            label={t(PASSWORD_LABEL_TEXT_KEY)}
            placeholder={t(PASSWORD_PLACEHOLDER_TEXT_KEY)}
            description={t(PASSWORD_VALIDATION_RULES_TEXT_KEY)}
            endContent={
                <button
                    className="focus:outline-none"
                    type="button"
                    onClick={onToggleVisibility}
                >
                    {isVisible ? (
                        <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                    ) : (
                        <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                    )}
                </button>
            }
            onChange={onStateChangeHandler}
        />
    );
};
const SignInButton: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const model = factory.useModel();

    const pending = useUnit(model.$pending);
    const allowSignIn = useUnit(model.$allowSubmit);

    const onPressButtonHandler = (): void => {
        model.submitPressed();
    };

    return (
        <Button
            isDisabled={!allowSignIn}
            color="primary"
            isLoading={pending}
            onPress={onPressButtonHandler}
        >
            {t(SIGN_IN_TEXT_KEY)}
        </Button>
    );
};

/**
 * View
 */
export const Form = modelView(factory, () => (
    <form className="flex flex-col gap-4">
        <EmailField />
        <PasswordField />
        <SignInButton />
    </form>
));