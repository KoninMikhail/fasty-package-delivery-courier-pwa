import { makeApi } from '@zodios/core';
import { z } from 'zod';

export const activeApi = makeApi([
    {
        method: 'get',
        path: '/',
        alias: 'getActiveDeliveries',
        description: 'Fetch active items',
        response: z.any(),
    },
]);
