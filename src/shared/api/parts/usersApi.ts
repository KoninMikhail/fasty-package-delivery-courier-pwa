import { makeApi } from '@zodios/core';
import { z } from 'zod';

export const usersApi = makeApi([
    {
        method: 'get',
        path: '/me',
        alias: 'getMe',
        description: 'Get the current user information',
        response: z.any(),
    },
    {
        method: 'get',
        path: '/:userId',
        alias: 'getUserById',
        description: 'Get a user by its ID',
        response: z.any(),
    },
    {
        method: 'patch',
        path: '/:userId',
        alias: 'patchUserById',
        description: 'Update a user by its ID',
        response: z.any(),
        parameters: [
            {
                name: 'user',
                type: 'Body',
                schema: z.object({
                    password: z.string(),
                }),
            },
        ],
    },
]);
