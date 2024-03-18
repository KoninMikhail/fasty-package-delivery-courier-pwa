import { makeApi, makeErrors } from '@zodios/core';
import { z } from 'zod';
import { AuthByEmailCredentialsSchema, AuthResponseSchema } from '../schemas';

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
        path: '/',
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
]);
