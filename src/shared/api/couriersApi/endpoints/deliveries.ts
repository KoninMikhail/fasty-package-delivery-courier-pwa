import { makeApi } from '@zodios/core';
import { z } from 'zod';

export const deliveriesApi = makeApi([
    {
        method: 'get',
        path: '/api/deliveries',
        alias: 'fetchUpcomingDeliveries',
        response: z.boolean(),
    },
]);
