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
]);
