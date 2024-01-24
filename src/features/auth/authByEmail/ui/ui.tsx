import { useUnit } from 'effector-react';
import { modelView } from 'effector-factorio';

import { ChangeEvent, useState } from 'react';
import { Button, ButtonProps, Input } from '@nextui-org/react';
import { sharedConfigLocale } from '@/shared/config';
import { InputProps } from '@nextui-org/input/dist/input';
import { useTranslation } from 'react-i18next';
import { sharedUiIcons } from '@/shared/ui';
import { factory } from '../model/model';

import { translationNS } from '../config';
import locale_en from '../locales/en.locale.json';
import locale_ru from '../locales/ru.locale.json';

const { locale } = sharedConfigLocale;
const { EyeSlashFilledIcon, EyeFilledIcon } = sharedUiIcons;

/**
 * locale
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * Components
 */
const EmailField: FunctionComponent<
    Pick<InputProps, 'label' | 'placeholder'>
> = ({ label, placeholder }) => {
    const model = factory.useModel();
    const email = useUnit(model.$login);

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
            isClearable
            label={label}
            placeholder={placeholder}
            variant="flat"
            value={email}
            onChange={onStateChangeHandler}
            onClear={onClearHandler}
        />
    );
};

const PasswordField: FunctionComponent<
    Pick<InputProps, 'label' | 'placeholder'>
> = ({ label, placeholder }) => {
    const model = factory.useModel();
    const password = useUnit(model.$password);

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
            label={label}
            placeholder={placeholder}
            variant="flat"
            value={password}
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
            type={isVisible ? 'text' : 'password'}
            onChange={onStateChangeHandler}
        />
    );
};

const SignInButton: FunctionComponent<Omit<ButtonProps, 'isLoading'>> = ({
    children,
    ...rest
}) => {
    const model = factory.useModel();
    const pending = useUnit(model.$pending);
    const errors = true;

    const onPressButtonHandler = (): void => {
        model.submitPressed();
    };

    return (
        <Button
            isDisabled={errors}
            color="primary"
            isLoading={pending}
            onPress={onPressButtonHandler}
            {...rest}
        >
            {children}
        </Button>
    );
};

/**
 * Form
 */
export const Form = modelView(factory, () => {
    const { t } = useTranslation(translationNS);

    return (
        <form className="flex flex-col gap-4">
            <EmailField
                label={t('email')}
                placeholder={t('email_placeholder')}
            />
            <PasswordField
                label={t('password')}
                placeholder={t('password_placeholder')}
            />
            <SignInButton>{t('sign_in')}</SignInButton>
        </form>
    );
});
