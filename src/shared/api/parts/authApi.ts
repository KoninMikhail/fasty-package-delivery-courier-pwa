import { makeApi } from '@zodios/core';
import { AuthByEmailCredentialsSchema, AuthResponseSchema } from '../schemas';

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
    },
]);
