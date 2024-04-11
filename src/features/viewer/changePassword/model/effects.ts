import { createEffect } from 'effector/effector.umd';
import { MIN_PASSWORD_LENGTH } from '@/features/viewer/changePassword/config';

export const validatePasswordLenght = createEffect<string, void>(
    async (password) => {
        if (password.length < MIN_PASSWORD_LENGTH - 1 && password.length > 0) {
            throw new Error('Слишком короткий пароль');
        }
    },
);

export const validatePasswordHasUpperCaseAndLowerCase = createEffect<
    string,
    void
>(async (password) => {
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
        throw new Error('не имеет разных регистров');
    }
});

export const validatePasswordHasNumbers = createEffect<string, void>(
    async (password) => {
        if (/\d/.test(password)) throw new Error('нет цифр');
    },
);

export const validatePasswordHasSpecialChars = createEffect<string, void>(
    async (password) => {
        if (/[!"#$%&'()*+,./:;<=>?@[\\\]^_{|}\-]+/.test(password)) {
            throw new Error('нет спец символов');
        }
    },
);
