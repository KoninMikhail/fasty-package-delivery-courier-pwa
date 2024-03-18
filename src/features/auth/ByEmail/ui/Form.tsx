import { useUnit } from 'effector-react';
import { modelView } from 'effector-factorio';

import { ChangeEvent } from 'react';
import { Button, Input } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { sharedUiComponents } from '@/shared/ui';
import { useKeyPress } from '@/shared/lib/browser';
import { factory } from '../model/model';

import { translationNS } from '../config';

const { PasswordField } = sharedUiComponents;

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

const Password: FunctionComponent = () => {
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

    return (
        <PasswordField
            isRequired
            variant="flat"
            isInvalid={isInvalid}
            errorMessage={t(errorMessage)}
            value={value}
            label={t(PASSWORD_LABEL_TEXT_KEY)}
            placeholder={t(PASSWORD_PLACEHOLDER_TEXT_KEY)}
            description={t(PASSWORD_VALIDATION_RULES_TEXT_KEY)}
            onChange={onStateChangeHandler}
        />
    );
};
const SignInButton: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const model = factory.useModel();

    const pending = useUnit(model.$pending);
    const allowSignIn = useUnit(model.$allowSubmit);
    const hasError = useUnit(model.$fail);

    const onPressButtonHandler = (): void => {
        model.submitPressed();
    };

    useKeyPress(['Enter'], () => {
        if (allowSignIn) onPressButtonHandler();
    });

    return (
        <Button
            isDisabled={!allowSignIn || hasError}
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
        <Password />
        <SignInButton />
    </form>
));
