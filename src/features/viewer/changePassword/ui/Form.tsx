import { modelView } from 'effector-factorio';
import { useUnit } from 'effector-react';
import { Button, ButtonProps, Spacer } from '@nextui-org/react';
import { sharedUiComponents, sharedUiIcons } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { RegisterCharsIcon } from '@/shared/ui/icons/RegisterCharsIcon';
import clsx from 'clsx';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { factory } from '../model';
import { translationNS } from '../config';

const { PasswordField } = sharedUiComponents;
const { AdditionalCharsIcon, GuardIcon, NumbersIcon, SixPlusIcon } =
    sharedUiIcons;

const TRANSLATION = {
    INPUT_CREATE_LABEL: 'form.input.create.label',
    INPUT_REPEAT_LABEL: 'form.input.confirm.label',
    SUBMIT_BUTTON: 'form.button.submit',
    VALIDATION_GUARD_LABEL: 'validation.label.guard',
    VALIDATION_LENGTH_LABEL: 'validation.label.length',
    VALIDATION_LOWER_CASE_LABEL: 'validation.label.lowercase',
    VALIDATION_NUMBERS_LABEL: 'validation.label.number',
    VALIDATION_SPECIAL_CHARS_LABEL: 'validation.label.specialChars',
    VALIDATION_SUCCESS_LABEL: 'validation.label.success',
    VALIDATION_ERR_EASY_LABEL: 'validation.label.error.easy',
};

const Password: FunctionComponent = () => {
    const model = factory.useModel();
    const { t } = useTranslation(translationNS);
    const [value, onChange] = useUnit([model.$password, model.passwordChanged]);

    return (
        <PasswordField
            autoComplete="off"
            value={value}
            variant="bordered"
            label={t(TRANSLATION.INPUT_CREATE_LABEL)}
            onValueChange={onChange}
        />
    );
};

const PasswordAgain: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const model = factory.useModel();
    const [value, onChange] = useUnit([
        model.$passwordRepeat,
        model.passwordRepeatChanged,
    ]);
    return (
        <PasswordField
            autoComplete="off"
            value={value}
            variant="bordered"
            label={t(TRANSLATION.INPUT_REPEAT_LABEL)}
            onValueChange={onChange}
        />
    );
};

const PasswordChecks: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const model = factory.useModel();

    const isPasswordValidLength = useUnit(model.$passwordLengthValid);
    const isPasswordHasUpperCaseAndLowerCase = useUnit(
        model.$passwordHasUpperCaseAndLowerCase,
    );
    const isPasswordHasNumbers = useUnit(model.$passwordHasNumbers);
    const isPasswordHasSpecialChars = useUnit(model.$passwordHasSpecialChars);
    const formValid = useUnit(model.$formValidated);

    const baseItemStyle =
        'flex items-center space-x-3 transition-all rtl:space-x-reverse';

    return (
        <ul className="space-y-4 p-2 text-left">
            <li
                className={clsx(
                    'flex items-center space-x-3 rtl:space-x-reverse',
                    {
                        'text-green': formValid,
                        'text-red': !formValid && !isPasswordHasSpecialChars,
                    },
                )}
            >
                <GuardIcon className="h-6 w-6 flex-shrink-0" />
                <span>
                    {!formValid && !isPasswordValidLength
                        ? t(TRANSLATION.VALIDATION_GUARD_LABEL)
                        : formValid && isPasswordHasSpecialChars
                          ? t(TRANSLATION.VALIDATION_SUCCESS_LABEL)
                          : t(TRANSLATION.VALIDATION_ERR_EASY_LABEL)}
                </span>
            </li>
            <li
                className={clsx(
                    baseItemStyle,
                    isPasswordValidLength && 'text-content3',
                )}
            >
                {isPasswordValidLength ? (
                    <IoCheckmarkOutline className="h-6 w-6 flex-shrink-0" />
                ) : (
                    <SixPlusIcon className="h-6 w-6 flex-shrink-0" />
                )}
                <span>{t(TRANSLATION.VALIDATION_LENGTH_LABEL)}</span>
            </li>
            <li
                className={clsx(
                    baseItemStyle,
                    isPasswordHasUpperCaseAndLowerCase && 'text-content3',
                )}
            >
                {isPasswordHasUpperCaseAndLowerCase ? (
                    <IoCheckmarkOutline className="h-6 w-6 flex-shrink-0" />
                ) : (
                    <RegisterCharsIcon className="h-6 w-6 flex-shrink-0" />
                )}

                <span>{t(TRANSLATION.VALIDATION_LOWER_CASE_LABEL)}</span>
            </li>
            <li
                className={clsx(
                    baseItemStyle,
                    isPasswordHasNumbers && 'text-content3',
                )}
            >
                {isPasswordHasNumbers ? (
                    <IoCheckmarkOutline className="h-6 w-6 flex-shrink-0" />
                ) : (
                    <NumbersIcon className="h-6 w-6 flex-shrink-0" />
                )}

                <span>{t(TRANSLATION.VALIDATION_NUMBERS_LABEL)}</span>
            </li>
            <li
                className={clsx(
                    baseItemStyle,
                    isPasswordHasSpecialChars && 'text-content3',
                )}
            >
                {isPasswordHasSpecialChars ? (
                    <IoCheckmarkOutline className="h-6 w-6 flex-shrink-0" />
                ) : (
                    <AdditionalCharsIcon className="h-6 w-6 flex-shrink-0" />
                )}

                <span>{t(TRANSLATION.VALIDATION_SPECIAL_CHARS_LABEL)}</span>
            </li>
        </ul>
    );
};

const ResetPasswordButton: FunctionComponent<Omit<ButtonProps, 'onPress'>> = (
    properties,
) => {
    const { t } = useTranslation(translationNS);
    const model = factory.useModel();

    const isFormValid = useUnit(model.$formValidated);

    const onPress = useUnit(model.submitPressed);
    return (
        <Button
            color="primary"
            onPress={onPress}
            isDisabled={!isFormValid}
            {...properties}
        >
            {t(TRANSLATION.SUBMIT_BUTTON)}
        </Button>
    );
};

export const Form = modelView(factory, () => {
    return (
        <div className="flex flex-col gap-2">
            <Password />
            <PasswordAgain />
            <Spacer y="1" />
            <PasswordChecks />
            <ResetPasswordButton />
        </div>
    );
});
