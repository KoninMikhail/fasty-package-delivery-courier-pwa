import { makeApi } from '@zodios/core';
import { z } from 'zod';
import { userSchema } from '../schemas/UserSchema';

export const meApi = makeApi([
    {
        method: 'get',
        path: '/',
        alias: 'getMe',
        description: 'Get the current user information',
        response: userSchema,
    },
    {
        method: 'get',
        path: '/deliveriesActive',
        alias: 'fetchActiveDeliveries',
        description: 'Fetch active deliveries',
        response: z.any(),
    },
    {
        method: 'get',
        path: '/deliveriesHistory',
        alias: 'fetchDeliveriesHistory',
        description: 'Fetch deliveries history',
        response: z.any(),
    },
]);
