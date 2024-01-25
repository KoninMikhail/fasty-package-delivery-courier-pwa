import { InputProps } from '@nextui-org/input/dist/input';
import { useUnit } from 'effector-react';
import { ChangeEvent } from 'react';
import { Button, ButtonProps, Input } from '@nextui-org/react';
import { modelView } from 'effector-factorio';
import { useTranslation } from 'react-i18next';
import { sharedConfigLocale } from '@/shared/config';
import { useEffectOnce } from 'usehooks-ts';
import { data } from 'autoprefixer';
import { factory } from '../model';

import { translationNS } from '../config';
import locale_en from '../locales/en.locale.json';
import locale_ru from '../locales/ru.locale.json';

const { locale } = sharedConfigLocale;

/*
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
    const pending = useUnit(model.$pending);

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
            isDisabled={pending}
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
    Omit<ButtonProps, 'isLoading'>
> = ({ children, ...rest }) => {
    const model = factory.useModel();
    const pending = useUnit(model.$pending);
    const allowedSend = useUnit(model.$allowedSend);

    const onPressButtonHandler = (): void => {
        model.submitPressed();
    };

    return (
        <Button
            isDisabled={!allowedSend}
            color="primary"
            isLoading={pending}
            onPress={onPressButtonHandler}
            {...rest}
        >
            {children}
        </Button>
    );
};

export const Form = modelView(factory, () => {
    const { t } = useTranslation(translationNS);
    const model = factory.useModel();

    useEffectOnce(() => {
        console.log('Triggered only once, on mount', { data });
    });

    return (
        <form className="flex flex-col gap-4">
            <EmailField
                label={t('email')}
                placeholder={t('email_placeholder')}
            />
            <SendResetRequestButton>{t('send_request')}</SendResetRequestButton>
        </form>
    );
});
