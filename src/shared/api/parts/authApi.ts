import { makeApi, makeErrors } from '@zodios/core';
import { z } from 'zod';
import {
    AuthByEmailCredentialsSchema,
    AuthResponseSchema,
    AuthTokensSchema,
    ForgotPasswordSchema,
    userSchema,
} from '../schemas';

const errors = makeErrors([
    {
        status: 'default',
        schema: z.object({
            message: z.string(),
        }),
    },
]);

export const authApi = makeApi([
    {
        method: 'post',
        path: '/login',
        alias: 'authByEmail',
        description: 'Authenticate a user by Email and Password',
        response: AuthResponseSchema,
        parameters: [
            {
                name: 'credentials',
                type: 'Body',
                schema: AuthByEmailCredentialsSchema,
            },
        ],
        errors,
    },
    {
        method: 'post',
        path: '/refresh-tokens',
        alias: 'refreshToken',
        description: 'Refresh the access token',
        response: AuthTokensSchema,
        parameters: [
            {
                name: 'body',
                type: 'Body',
                schema: z.object({
                    refreshToken: z.string(),
                }),
            },
        ],
        errors,
    },
    {
        method: 'post',
        path: '/logout',
        alias: 'logout',
        description: 'Logout the current user',
        response: z.unknown(),
        parameters: [
            {
                name: 'body',
                type: 'Body',
                schema: z.object({
                    refreshToken: z.string(),
                }),
            },
        ],
    },
    {
        path: '/forgot-password',
        method: 'post',
        alias: 'forgotPassword',
        parameters: [
            {
                name: 'body',
                type: 'Body',
                schema: ForgotPasswordSchema,
            },
        ],
        response: z.any(),
        errors,
    },
    {
        path: '/reset-password',
        method: 'post',
        alias: 'resetPassword',
        parameters: [
            {
                name: 'body',
                type: 'Body',
                schema: z.object({
                    password: z.string(),
                }),
            },
        ],
        response: z.unknown(), // "204 No Contents
        errors,
    },
    {
        method: 'get',
        path: '/me',
        alias: 'getMe',
        description: 'Get the current user information',
        response: userSchema,
        errors,
    },
]);
