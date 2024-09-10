import { User } from '@/shared/api';
import {
    combine,
    createEvent,
    createStore,
    Effect,
    sample,
    Store,
} from 'effector';
import { modelFactory } from 'effector-factorio';
import { ChangePasswordFxParameters } from '@/entities/viewer';
import { pending } from 'patronum';

import { MIN_PASSWORD_LENGTH } from '../config';
import { ValidationPasswordErrors } from '../types';

/* eslint-disable no-useless-escape */

interface FactoryOptions {
    targetUser: Store<User>;
    updateUserFx: Effect<ChangePasswordFxParameters, void, Error>;
    demoMode: boolean;
}

export const factory = modelFactory((options: FactoryOptions) => {
    const { targetUser, updateUserFx, demoMode } = options;

    const passwordChanged = createEvent<string>();
    const passwordRepeatChanged = createEvent<string>();
    const submitPressed = createEvent<void>();
    const passwordUpdated = createEvent<void>();
    const reset = createEvent<void>();

    /**
     * Form Data
     */
    const $password = createStore('').reset(reset);
    const $passwordRepeat = createStore('').reset(reset);

    $password.on(passwordChanged, (_, password) => password);
    $passwordRepeat.on(passwordRepeatChanged, (_, password) => password);

    const $isTouched = $password.map((password) => password.length > 0);

    const $errors = combine(
        $password,
        $passwordRepeat,
        (password, passwordRepeat) => {
            const errors = [];

            const isPasswordLengthValid =
                /\S/.test(password) && password.length >= MIN_PASSWORD_LENGTH;

            const isPasswordHasUpperCaseAndLowerCase =
                /[a-z]/.test(password) && /[A-Z]/.test(password);
            const isPasswordHasNumbers = /\d/.test(password);
            const isPasswordHasSpecialChars =
                /[!"#$%&'()*+,./:;<=>?@[\\\]^_{|}\-]+/.test(password);
            const isPasswordEqual =
                isPasswordLengthValid && password === passwordRepeat;

            if (!isPasswordLengthValid)
                errors.push(ValidationPasswordErrors.Length);
            if (!isPasswordHasUpperCaseAndLowerCase)
                errors.push(ValidationPasswordErrors.LowerCase);
            if (!isPasswordHasNumbers)
                errors.push(ValidationPasswordErrors.Numbers);
            if (!isPasswordHasSpecialChars)
                errors.push(ValidationPasswordErrors.SpecialChars);
            if (!isPasswordEqual)
                errors.push(ValidationPasswordErrors.NotEqual);

            return errors;
        },
    );
    const $hasErrors = $errors.map((errors) => errors.length > 0);

    /**
     * States
     */

    const $inPending = pending([updateUserFx]);

    /**
     * Validations
     */
    const $formValidated = $errors.map((errors) => errors.length === 0);

    sample({
        clock: submitPressed,
        source: {
            password: $password,
            user: targetUser,
            isValid: $formValidated,
        },
        filter: ({ isValid }) => isValid,
        fn: ({ password, user }) => ({ password, user }),
        target: updateUserFx,
    });

    sample({
        clock: updateUserFx.done,
        target: [passwordUpdated, reset],
    });

    return {
        targetUser,
        $password,
        $errors,
        $isTouched,
        $passwordRepeat,
        $formValidated,
        $inPending,
        passwordChanged,
        passwordRepeatChanged,
        submitPressed,
        $hasErrors,
        isDemoMode: demoMode,
    };
});
