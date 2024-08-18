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

/* eslint-disable no-useless-escape */

interface FactoryOptions {
    targetUser: Store<User>;
    updateUserFx: Effect<ChangePasswordFxParameters, void, Error>;
    logoutFx: Effect<void, unknown, Error>;
    demoMode: boolean;
}

export const factory = modelFactory((options: FactoryOptions) => {
    const { targetUser, updateUserFx, logoutFx, demoMode } = options;

    const passwordChanged = createEvent<string>();
    const passwordRepeatChanged = createEvent<string>();
    const submitPressed = createEvent<void>();
    const reset = createEvent<void>();

    /**
     * Form Data
     */
    const $password = createStore('').reset(reset);
    const $passwordRepeat = createStore('').reset(reset);

    $password.on(passwordChanged, (_, password) => password);
    $passwordRepeat.on(passwordRepeatChanged, (_, password) => password);

    /**
     * States
     */

    const $inPending = pending([updateUserFx]);

    /**
     * Validations
     */
    const $passwordLengthValid = combine(
        $password,
        (password) =>
            /\S/.test(password) && password.length >= MIN_PASSWORD_LENGTH,
    );
    const $passwordHasUpperCaseAndLowerCase = combine(
        $password,
        (password) => /[a-z]/.test(password) && /[A-Z]/.test(password),
    );
    const $passwordHasNumbers = combine($password, (password) =>
        /\d/.test(password),
    );
    const $passwordHasSpecialChars = combine($password, (password) => {
        return /[!"#$%&'()*+,./:;<=>?@[\\\]^_{|}\-]+/.test(password);
    });

    const $formValidated = combine(
        $passwordLengthValid,
        $passwordHasUpperCaseAndLowerCase,
        $passwordHasNumbers,
        (
            passwordNotEmpty,
            passwordHasUpperCaseAndLowerCase,
            passwordHasNumbers,
        ) =>
            passwordNotEmpty &&
            passwordHasUpperCaseAndLowerCase &&
            passwordHasNumbers,
    );

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
        target: reset,
    });

    sample({
        clock: updateUserFx.done,
        filter: () => !demoMode,
        target: logoutFx,
    });

    return {
        targetUser,
        $password,
        $passwordRepeat,
        $formValidated,
        $inPending,
        $passwordHasNumbers,
        $passwordHasUpperCaseAndLowerCase,
        $passwordLengthValid,
        $passwordHasSpecialChars,
        passwordChanged,
        passwordRepeatChanged,
        submitPressed,
        isDemoMode: demoMode,
    };
});
