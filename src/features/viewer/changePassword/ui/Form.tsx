import { modelView } from 'effector-factorio';
import { useUnit } from 'effector-react';
import { Button, ButtonProps, Spacer } from '@nextui-org/react';
import { sharedUiComponents, sharedUiIcons } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { RegisterCharsIcon } from '@/shared/ui/icons/RegisterCharsIcon';
import clsx from 'clsx';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { ValidationPasswordErrors } from '@/features/viewer/changePassword/types';
import { factory } from '../model';
import {
    INPUT_CREATE_LABEL,
    INPUT_REPEAT_LABEL,
    NOTIFICATION_DEMO_MODE_TEXT,
    SUBMIT_BUTTON,
    translationNS,
    VALIDATION_ERR_EASY_LABEL,
    VALIDATION_ERR_NOT_MATCH_LABEL,
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

const ListItemWithIconAnLabel: FunctionComponent<{
    ValidIcon: FunctionComponent;
    InvalidIcon: FunctionComponent;
    successText: string;
    errorText?: string;
    placeholder?: string;
    PlaceholderIcon: FunctionComponent;
    isValid: boolean;
    isTouched: boolean;
    dontUseWarningColor?: boolean;
}> = ({
    ValidIcon,
    InvalidIcon,
    isValid,
    isTouched,
    successText,
    errorText,
    placeholder,
    PlaceholderIcon,
    dontUseWarningColor,
}) => {
    if (!isTouched)
        return (
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <PlaceholderIcon className="h-6 w-6 flex-shrink-0" />
                <span>{placeholder}</span>
            </li>
        );

    if (isTouched && !isValid)
        return (
            <li
                className={clsx(
                    'flex items-center space-x-3 rtl:space-x-reverse',
                    { 'text-warning': !dontUseWarningColor },
                )}
            >
                <InvalidIcon className="h-6 w-6 flex-shrink-0" />
                <span>{errorText}</span>
            </li>
        );

    return (
        <li className="flex items-center space-x-3 rtl:space-x-reverse">
            <ValidIcon className="h-6 w-6 flex-shrink-0" />
            <span>{successText}</span>
        </li>
    );
};

const ListItemWithPasswordState: FunctionComponent<{
    state: 'default' | 'easy' | 'not-equal' | 'success';
}> = ({ state }) => {
    const { t } = useTranslation(translationNS);
    switch (state) {
        case 'easy': {
            return (
                <ListItemWithIconAnLabel
                    ValidIcon={GuardIcon}
                    InvalidIcon={GuardIcon}
                    placeholder={t(VALIDATION_ERR_EASY_LABEL)}
                    errorText={t(VALIDATION_ERR_EASY_LABEL)}
                    successText={t(VALIDATION_ERR_EASY_LABEL)}
                    PlaceholderIcon={GuardIcon}
                    isValid
                    isTouched
                    dontUseWarningColor
                />
            );
        }
        case 'not-equal': {
            return (
                <ListItemWithIconAnLabel
                    ValidIcon={GuardIcon}
                    InvalidIcon={GuardIcon}
                    placeholder={t(VALIDATION_ERR_NOT_MATCH_LABEL)}
                    errorText={t(VALIDATION_ERR_NOT_MATCH_LABEL)}
                    successText={t(VALIDATION_ERR_NOT_MATCH_LABEL)}
                    PlaceholderIcon={GuardIcon}
                    isValid={false}
                    isTouched
                />
            );
        }
        case 'success': {
            return (
                <ListItemWithIconAnLabel
                    ValidIcon={GuardIcon}
                    InvalidIcon={GuardIcon}
                    placeholder={t(VALIDATION_SUCCESS_LABEL)}
                    errorText={t(VALIDATION_SUCCESS_LABEL)}
                    successText={t(VALIDATION_SUCCESS_LABEL)}
                    PlaceholderIcon={GuardIcon}
                    isValid
                    isTouched
                    dontUseWarningColor
                />
            );
        }
        default: {
            return (
                <ListItemWithIconAnLabel
                    ValidIcon={GuardIcon}
                    InvalidIcon={GuardIcon}
                    placeholder={t(VALIDATION_GUARD_LABEL)}
                    errorText={t(VALIDATION_GUARD_LABEL)}
                    successText={t(VALIDATION_GUARD_LABEL)}
                    PlaceholderIcon={GuardIcon}
                    isValid
                    isTouched
                    dontUseWarningColor
                />
            );
        }
    }
};

const PasswordChecks: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const model = factory.useModel();
    const { isTouched, formValid, errors, hasErrors } = useUnit({
        password: model.$password,
        isTouched: model.$isTouched,
        formValid: model.$formValidated,
        errors: model.$errors,
        hasErrors: model.$hasErrors,
    });

    const isPasswordValidLength = !errors.includes(
        ValidationPasswordErrors.Length,
    );
    const isPasswordHasNumbers = !errors.includes(
        ValidationPasswordErrors.Numbers,
    );
    const isPasswordHasSpecialChars = !errors.includes(
        ValidationPasswordErrors.SpecialChars,
    );
    const isPasswordHasUpperCaseAndLowerCase = !errors.includes(
        ValidationPasswordErrors.LowerCase,
    );
    const isPasswordEqual = !errors.includes(ValidationPasswordErrors.NotEqual);

    const formState = () => {
        if (isTouched && formValid && isPasswordEqual && !hasErrors)
            return 'success';
        if (isTouched && !isPasswordValidLength) return 'easy';
        if (isTouched && !isPasswordEqual) return 'not-equal';
        return 'default';
    };

    return (
        <ul className="space-y-4 p-2 text-left">
            <ListItemWithPasswordState state={formState()} />
            <ListItemWithIconAnLabel
                ValidIcon={IoCheckmarkOutline}
                InvalidIcon={SixPlusIcon}
                PlaceholderIcon={SixPlusIcon}
                placeholder={t(VALIDATION_LENGTH_LABEL)}
                successText={t(VALIDATION_LENGTH_LABEL)}
                errorText={t(VALIDATION_LENGTH_LABEL)}
                isTouched={isTouched}
                isValid={isPasswordValidLength}
            />
            <ListItemWithIconAnLabel
                ValidIcon={IoCheckmarkOutline}
                InvalidIcon={RegisterCharsIcon}
                PlaceholderIcon={RegisterCharsIcon}
                placeholder={t(VALIDATION_LOWER_CASE_LABEL)}
                successText={t(VALIDATION_LOWER_CASE_LABEL)}
                errorText={t(VALIDATION_LOWER_CASE_LABEL)}
                isValid={isPasswordHasUpperCaseAndLowerCase}
                isTouched={isTouched}
            />
            <ListItemWithIconAnLabel
                ValidIcon={IoCheckmarkOutline}
                InvalidIcon={NumbersIcon}
                PlaceholderIcon={NumbersIcon}
                placeholder={t(VALIDATION_NUMBERS_LABEL)}
                successText={t(VALIDATION_SUCCESS_LABEL)}
                errorText={t(VALIDATION_NUMBERS_LABEL)}
                isValid={isPasswordHasNumbers}
                isTouched={isTouched}
            />
            <ListItemWithIconAnLabel
                ValidIcon={IoCheckmarkOutline}
                InvalidIcon={AdditionalCharsIcon}
                PlaceholderIcon={AdditionalCharsIcon}
                placeholder={t(VALIDATION_SPECIAL_CHARS_LABEL)}
                successText={t(VALIDATION_SPECIAL_CHARS_LABEL)}
                errorText={t(VALIDATION_SPECIAL_CHARS_LABEL)}
                isValid={isPasswordHasSpecialChars}
                isTouched={isTouched}
            />
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
