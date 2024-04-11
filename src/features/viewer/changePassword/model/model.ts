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
import {
    validatePasswordHasNumbers,
    validatePasswordHasSpecialChars,
    validatePasswordHasUpperCaseAndLowerCase,
    validatePasswordLenght,
} from '@/features/viewer/changePassword/model/effects';
import { MIN_PASSWORD_LENGTH } from '../config';

/* eslint-disable no-useless-escape */

interface FactoryOptions {
    targetUser: Store<User>;
    updateUserFx: Effect<ChangePasswordFxParameters, void, Error>;
    validatePasswordFx: Effect<string, boolean, Error>;
}

export const factory = modelFactory((options: FactoryOptions) => {
    const { targetUser, updateUserFx } = options;

    const passwordChanged = createEvent<string>();
    const passwordRepeatChanged = createEvent<string>();
    const submitPressed = createEvent<void>();

    /**
     * Form Data
     */
    const $password = createStore('');
    const $passwordRepeat = createStore('');

    $password.on(passwordChanged, (_, password) => password);
    $passwordRepeat.on(passwordRepeatChanged, (_, password) => password);

    const $inProcess = pending([
        validatePasswordLenght,
        validatePasswordHasNumbers,
        validatePasswordHasUpperCaseAndLowerCase,
        validatePasswordHasSpecialChars,
    ]);

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

    return {
        targetUser,
        $password,
        $passwordRepeat,
        $formValidated,
        $passwordHasNumbers,
        $passwordHasUpperCaseAndLowerCase,
        $passwordLengthValid,
        $passwordHasSpecialChars,
        passwordChanged,
        passwordRepeatChanged,
        submitPressed,
    };
});
