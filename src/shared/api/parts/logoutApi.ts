import { makeApi } from '@zodios/core';
import { z } from 'zod';

export const logoutApi = makeApi([
    {
        method: 'post',
        path: '/',
        alias: 'logoutMe',
        description: 'Logout the current user',
        parameters: [
            {
                name: 'body',
                type: 'Body',
                schema: z.unknown(),
            },
        ],
        response: z.unknown(),
    },
]);
