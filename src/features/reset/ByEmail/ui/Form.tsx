import { InputProps } from '@nextui-org/input/dist/input';
import { useUnit } from 'effector-react';
import { ChangeEvent } from 'react';
import { Button, ButtonProps, Input } from '@nextui-org/react';
import { modelView } from 'effector-factorio';
import { useTranslation } from 'react-i18next';
import { useKeyPress } from '@/shared/lib/browser';
import { useUnmount } from 'usehooks-ts';
import { factory } from '../model';

import {
    EMAIL_LABEL_TEXT_KEY,
    EMAIL_PLACEHOLDER_TEXT_KEY,
    SEND_REQUEST_TEXT_KEY,
    SEND_SUCCESS_TEXT_KEY,
    translationNS,
} from '../config';

/**
 * Components
 */
const EmailField: FunctionComponent<
    Pick<InputProps, 'label' | 'placeholder'>
> = ({ label, placeholder }) => {
    const { t } = useTranslation(translationNS);
    const model = factory.useModel();
    const email = useUnit(model.$login);
    const pending = useUnit(model.$pending);
    const done = useUnit(model.$done);
    const failed = useUnit(model.$fail);
    const failedMessageCode = useUnit(model.$failMessage);
    const failMessage = failed ? t(failedMessageCode) : '';

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
            isInvalid={failed}
            errorMessage={failMessage}
            isDisabled={pending || done}
            label={label}
            placeholder={placeholder}
            variant="flat"
            value={email}
            onChange={onStateChangeHandler}
            onClear={onClearHandler}
        />
    );
};

const SendResetRequestButton: FunctionComponent<
    Omit<ButtonProps, 'isLoading' | 'children'> & {
        defaultText: string;
        successRequestText: string;
    }
> = ({ defaultText, successRequestText, ...rest }) => {
    const model = factory.useModel();
    const pending = useUnit(model.$pending);
    const allowedSend = useUnit(model.$allowedSend);
    const done = useUnit(model.$done);

    const onPressButtonHandler = (): void => {
        model.submitPressed();
    };

    useKeyPress(['Enter'], () => {
        if (allowedSend && !pending && !done) onPressButtonHandler();
    });

    return (
        <Button
            isDisabled={!allowedSend || pending || done}
            color={done ? 'default' : 'primary'}
            isLoading={pending}
            onPress={onPressButtonHandler}
            {...rest}
        >
            {done ? successRequestText : defaultText}
        </Button>
    );
};

/**
 * View
 */
export const Form = modelView(factory, () => {
    const { t } = useTranslation(translationNS);
    const model = factory.useModel();
    const resetForm = useUnit(model.resetFormState);

    useUnmount(() => {
        resetForm();
    });

    return (
        <form className="flex flex-col gap-4">
            <EmailField
                label={t(EMAIL_LABEL_TEXT_KEY)}
                placeholder={t(EMAIL_PLACEHOLDER_TEXT_KEY)}
            />
            <SendResetRequestButton
                successRequestText={t(SEND_SUCCESS_TEXT_KEY)}
                defaultText={t(SEND_REQUEST_TEXT_KEY)}
            />
        </form>
    );
});
