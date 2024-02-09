import { makeApi, makeErrors, ZodiosBodyByPath } from '@zodios/core';
import { z } from 'zod';

/**
 * Constants
 */

const AUTH_PATH = '/api/logins';
const FORGOT_PASSWORD_PATH = '/api/forgotPassword';

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 30;

/**
 * Schemas
 */
export const AuthSchema = z.object({
    login: z.string().email(),
    password: z.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
});

/**
 * Errors
 */
export const authErrors = makeErrors([
    {
        status: 500,
        description: 'Internal server error',
        schema: z.object({
            error: z.object({
                code: z.number(),
                message: z.string(),
            }),
        }),
    },
]);

export type AuthErrors = typeof authErrors;

/**
 * Api
 */
export const authApi = makeApi([
    {
        method: 'post',
        path: AUTH_PATH,
        alias: 'requestAuth',
        parameters: [
            {
                name: 'body',
                type: 'Body',
                schema: AuthSchema,
            },
        ],
        response: z.array(),
        errors: authErrors,
    },
    {
        method: 'post',
        path: '/api/logout',
        alias: 'logout',
        response: z.boolean(),
    },
    {
        method: 'post',
        path: FORGOT_PASSWORD_PATH,
        alias: 'forgotPassword',
        parameters: [
            {
                name: 'body',
                type: 'Body',
                schema: AuthSchema.omit({ password: true }),
            },
        ],
        response: z.void(),
        errors: authErrors,
    },
]);

type Api = typeof authApi;

export type AuthUserRequest = ZodiosBodyByPath<Api, 'post', typeof AUTH_PATH>;
export type ResetUserPasswordRequest = ZodiosBodyByPath<
    Api,
    'post',
    typeof FORGOT_PASSWORD_PATH
>;
