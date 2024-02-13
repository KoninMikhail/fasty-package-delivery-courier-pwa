import { makeApi } from '@zodios/core';
import { z } from 'zod';

export const deliverySchema = z.object({
    id: z.number(),
});

export type Delivery = z.infer<typeof deliverySchema>;

export const deliveriesApi = makeApi([
    {
        method: 'get',
        path: '/api/deliveries',
        alias: 'fetchUpcomingDeliveries',
        response: z.any(),
    },
    {
        method: 'get',
        path: '/api/deliveries/:deliveryId',
        alias: 'fetchDeliveryById',
        response: z.any(),
    },
    {
        method: 'get',
        path: '/api/deliveries/:startDate/:endDate',
        alias: 'fetchDeliveriesByDateRange',
        response: z.any(),
    },
]);
