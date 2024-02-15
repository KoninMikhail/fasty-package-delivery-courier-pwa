import { makeApi } from '@zodios/core';
import { z } from 'zod';

export const historyApi = makeApi([
    {
        method: 'get',
        path: '/',
        alias: 'getHistoryDeliveries',
        description: 'Fetch history',
        response: z.any(),
    },
]);
