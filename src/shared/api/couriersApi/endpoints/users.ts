import { makeApi } from '@zodios/core';
import { z } from 'zod';

export const usersApi = makeApi([
    {
        method: 'get',
        path: '/api/me',
        alias: 'getViewer',
        response: z.any(),
    },
]);
