import { makeApi, makeErrors } from '@zodios/core';
import { z } from 'zod';
import { deliverySchema } from '../schemas';

export const deliveriesErrors = makeErrors([]);

export const deliveriesApi = makeApi([
    {
        method: 'get',
        path: '/',
        alias: 'fetchAvailableAssignDeliveries',
        description: 'Fetch upcoming deliveries',
        parameters: [
            {
                name: 'from',
                type: 'Query',
                schema: z.string().optional(),
            },
            {
                name: 'to',
                type: 'Query',
                schema: z.string().optional(),
            },
        ],
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
        path: '/:deliveryId',
        alias: 'fetchDeliveryById',
        description: 'Fetch a delivery by its ID',
        response: deliverySchema,
        errors: [
            {
                status: 'default',
                schema: z.object({
                    message: z.string(),
                }),
            },
        ],
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
        response: z.any(),
        parameters: [
            {
                name: 'from',
                type: 'Query',
                schema: z.string().optional(),
            },
            {
                name: 'to',
                type: 'Query',
                schema: z.string().optional(),
            },
        ],
    },
    {
        method: 'get',
        path: '/search',
        alias: 'searchDeliveriesByQuery',
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
