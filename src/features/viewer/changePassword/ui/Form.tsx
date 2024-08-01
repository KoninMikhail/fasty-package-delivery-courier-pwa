import { modelView } from 'effector-factorio';
import { useUnit } from 'effector-react';
import { Button, ButtonProps, Spacer } from '@nextui-org/react';
import { sharedUiComponents, sharedUiIcons } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { RegisterCharsIcon } from '@/shared/ui/icons/RegisterCharsIcon';
import clsx from 'clsx';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { factory } from '../model';
import {
    INPUT_CREATE_LABEL,
    INPUT_REPEAT_LABEL,
    NOTIFICATION_DEMO_MODE_TEXT,
    SUBMIT_BUTTON,
    translationNS,
    VALIDATION_ERR_EASY_LABEL,
    VALIDATION_GUARD_LABEL,
    VALIDATION_LENGTH_LABEL,
    VALIDATION_LOWER_CASE_LABEL,
    VALIDATION_NUMBERS_LABEL,
    VALIDATION_SPECIAL_CHARS_LABEL,
    VALIDATION_SUCCESS_LABEL,
} from '../config';

const { PasswordField } = sharedUiComponents;
const { AdditionalCharsIcon, GuardIcon, NumbersIcon, SixPlusIcon } =
    sharedUiIcons;

const Password: FunctionComponent = () => {
    const model = factory.useModel();
    const { t } = useTranslation(translationNS);
    const [value, onChange] = useUnit([model.$password, model.passwordChanged]);

    return (
        <PasswordField
            autoComplete="off"
            value={value}
            variant="bordered"
            label={t(INPUT_CREATE_LABEL)}
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
            label={t(INPUT_REPEAT_LABEL)}
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
                        ? t(VALIDATION_GUARD_LABEL)
                        : formValid && isPasswordHasSpecialChars
                          ? t(VALIDATION_SUCCESS_LABEL)
                          : t(VALIDATION_ERR_EASY_LABEL)}
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
                <span>{t(VALIDATION_LENGTH_LABEL)}</span>
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

                <span>{t(VALIDATION_LOWER_CASE_LABEL)}</span>
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

                <span>{t(VALIDATION_NUMBERS_LABEL)}</span>
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

                <span>{t(VALIDATION_SPECIAL_CHARS_LABEL)}</span>
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
    const isLoading = useUnit(model.$inPending);

    const onPress = useUnit(model.submitPressed);
    return (
        <Button
            color="primary"
            onPress={onPress}
            isDisabled={!isFormValid}
            isLoading={isLoading}
            {...properties}
        >
            {t(SUBMIT_BUTTON)}
        </Button>
    );
};

const DemoModeNotice: FunctionComponent = () => {
    const model = factory.useModel();
    const { t } = useTranslation(translationNS);
    const { isDemoMode } = model;
    if (isDemoMode) {
        return (
            <div className="w-full p-2 text-center text-sm opacity-30">
                {t(NOTIFICATION_DEMO_MODE_TEXT)}
            </div>
        );
    }
    return null;
};

export const Form = modelView(factory, () => {
    return (
        <div className="flex flex-col gap-2">
            <Password />
            <PasswordAgain />
            <Spacer y={1} />
            <PasswordChecks />
            <ResetPasswordButton />
            <DemoModeNotice />
        </div>
    );
});
