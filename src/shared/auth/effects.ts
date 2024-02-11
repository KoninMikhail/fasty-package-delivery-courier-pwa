// Эффект для входа в систему, получит {login, password} и вернет token
import { createEffect } from 'effector';
import axios from 'axios';
import Cookies from 'js-cookie';
import { SESSION_EXPIRATION_DAYS } from '@/shared/auth/config';
import {
    LoginRequest,
    ResetPasswordRequest,
    resetPasswordSchema,
    Session,
} from './schemas';

const API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL;
const API_LOGIN_URL = `${API_BASE_URL}/api/login`;
const API_RESET_PASSWORD_URL = `${API_BASE_URL}/api/forgotPassword`;
const JWT_TOKEN_COOKIE_KEY = import.meta.env.VITE_JWT_TOKEN_COOKIE_KEY;

// Effect for user login with Zod validation
export const authByEMailRequestFx = createEffect<LoginRequest, Session, Error>(
    async (credentials) => {
        const { data } = await axios.post<Session>(API_LOGIN_URL, credentials);
        Cookies.set(JWT_TOKEN_COOKIE_KEY, data.token, {
            expires: SESSION_EXPIRATION_DAYS,
        });
        return data;
    },
);

// Effect for user password reset with Zod validation
export const resetByEmailRequestFx = createEffect<
    ResetPasswordRequest,
    void,
    Error
>(async (data) => {
    const parsedEmail = resetPasswordSchema.parse(data);
    await axios.post(API_RESET_PASSWORD_URL, parsedEmail);
});

// Effect for user logout
export const removeSessionFx = createEffect<void, void, Error>(() => {
    Cookies.remove(JWT_TOKEN_COOKIE_KEY);
});

// Effect for token validation and renewal
export const revalidateTokenFx = createEffect<void, void, Error>(async () => {
    const token = Cookies.get(JWT_TOKEN_COOKIE_KEY);
    if (token) {
        Cookies.set(JWT_TOKEN_COOKIE_KEY, token, {
            expires: SESSION_EXPIRATION_DAYS,
        });
    } else {
        await removeSessionFx();
    }
});
