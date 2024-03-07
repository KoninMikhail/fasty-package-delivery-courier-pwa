import { makeApi, makeErrors } from '@zodios/core';
import { z } from 'zod';
import { format, parse } from 'date-fns';
import { deliverySchema } from '../schemas';

export const deliveriesErrors = makeErrors([]);

export const deliveriesApi = makeApi([
    {
        method: 'get',
        path: '/',
        alias: 'fetchUpcomingDeliveries',
        description: 'Fetch upcoming deliveries',
        parameters: [
            {
                name: 'from',
                type: 'Query',
                schema: z
                    .string()
                    .optional()
                    .transform((value) => {
                        if (typeof value === 'string') {
                            const date = parse(value, 'dd-MM-yyyy', new Date());
                            return format(date, 'yyyy-MM-dd');
                        }
                    }),
            },
            {
                name: 'to',
                type: 'Query',
                schema: z
                    .string()
                    .optional()
                    .transform((value) => {
                        if (typeof value === 'string') {
                            const date = parse(value, 'dd-MM-yyyy', new Date());
                            return format(date, 'yyyy-MM-dd');
                        }
                    }),
            },
        ],
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
        method: 'get',
        path: '/:deliveryId',
        alias: 'fetchDeliveryById',
        description: 'Fetch a delivery by its ID',
        response: deliverySchema,
        errors: deliveriesErrors,
    },
    {
        method: 'patch',
        path: '/:deliveryId',
        alias: 'patchDelivery',
        description: 'Patch a delivery by its ID',
        parameters: [
            {
                name: 'Body',
                type: 'Body',
                schema: deliverySchema.omit({ id: true }).partial(),
            },
        ],
        response: deliverySchema,
    },
    {
        method: 'get',
        path: '/my',
        alias: 'getMyDeliveries',
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
        response: z.array(deliverySchema),
    },
    {
        method: 'get',
        path: '/search',
        alias: 'searchDeliveriesByQuery',
        description: 'Search for a product',
        response: z.array(deliverySchema),
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
