import { makeApi, makeErrors } from '@zodios/core';
import { z } from 'zod';
import { deliverySchema } from '../schemas';

export const deliveriesErrors = makeErrors([]);

export const deliveriesApi = makeApi([
    {
        method: 'get',
        path: '/',
        alias: 'fetchUpcomingDeliveries',
        description: 'Fetch upcoming deliveries',
        response: z
            .array(deliverySchema)
            .transform((data) =>
                data.filter(
                    (delivery) => delivery.address.delivery_type === 'courier',
                ),
            ),
        errors: deliveriesErrors,
    },
    {
        method: 'patch',
        path: '/:deliveryId',
        alias: 'assignDeliveryToCourier',
        description: 'Assign a delivery to a courier',
        parameters: [
            {
                name: 'courier_id',
                type: 'Body',
                schema: deliverySchema.pick({ courier_id: true }),
            },
        ],
        response: deliverySchema,
    },
    {
        method: 'get',
        path: '/:deliveryId',
        alias: 'fetchDeliveryById',
        description: 'Fetch a delivery by its ID',
        response: deliverySchema,
        errors: deliveriesErrors,
    },
    {
        method: 'get',
        path: '/:startDate/:endDate',
        alias: 'fetchDeliveriesByDatesRange',
        description: 'Fetch deliveries by dates range',
        response: z.array(deliverySchema),
        errors: deliveriesErrors,
    },
    {
        method: 'get',
        path: '/my',
        alias: 'getActiveDeliveries',
        description: 'Fetch active deliveries',
        response: z
            .array(deliverySchema)
            .transform((data) =>
                data.filter(
                    (delivery) => delivery.address.delivery_type === 'courier',
                ),
            ),
    },
    {
        method: 'get',
        path: '/history',
        alias: 'getDeliveriesHistory',
        description: 'Fetch deliveries history',
        response: z.any(),
    },
    {
        method: 'get',
        path: '/search',
        alias: 'searchDeliveriesById',
        description: 'Search for a product',
        response: z.any(),
        parameters: [
            {
                name: 'query',
                description: 'Search by delivery number',
                type: 'Query',
                schema: z.string(),
            },
        ],
    },
]);
