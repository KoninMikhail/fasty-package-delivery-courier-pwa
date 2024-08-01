import { makeApi, makeErrors } from '@zodios/core';
import { z } from 'zod';
import { deliverySchema, deliveryStateSchema } from '../schemas';

export const deliveriesErrors = makeErrors([
    {
        status: 'default',
        schema: z.object({
            message: z.string(),
        }),
    },
]);

export const deliveriesApi = makeApi([
    {
        method: 'get',
        path: '/upcoming',
        alias: 'fetchAvailableAssignDeliveries',
        description: 'Fetch upcoming deliveries',
        parameters: [
            {
                name: 'limit',
                type: 'Query',
                schema: z.number().optional(),
            },
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
            {
                name: 'express',
                type: 'Query',
                schema: z.boolean().optional(),
            },
            {
                name: 'car',
                type: 'Query',
                schema: z.boolean().optional(),
            },
            {
                name: 'weightMin',
                type: 'Query',
                schema: z.number().optional(),
            },
            {
                name: 'weightMax',
                type: 'Query',
                schema: z.number().optional(),
            },
        ],
        response: z.array(
            deliverySchema.omit({
                manager: true,
                courier: true,
                client: true,
                contact: true,
            }),
        ),
        errors: deliveriesErrors,
    },
    {
        method: 'get',
        path: '/item/:deliveryId',
        alias: 'fetchDeliveryById',
        description: 'Fetch a delivery by its ID',
        response: deliverySchema,
        errors: deliveriesErrors,
    },
    {
        method: 'post',
        path: '/item/:deliveryId/assign/:userId',
        alias: 'assignUserToDelivery',
        description: 'Assign a user to a delivery',
        parameters: [],
        response: deliverySchema,
    },
    {
        method: 'patch',
        path: '/item/:deliveryId/set-state',
        alias: 'setDeliveryState',
        description: 'Update delivery state',
        parameters: [
            {
                type: 'Body',
                name: 'Body',
                schema: z.object({
                    state: deliveryStateSchema,
                    comment: z.string(),
                }),
            },
        ],
        response: deliverySchema,
        errors: deliveriesErrors,
    },
    {
        method: 'get',
        path: '/my',
        alias: 'getMyDeliveries',
        description: 'Fetch active deliveries',
        response: z.array(deliverySchema),
        errors: deliveriesErrors,
    },
    {
        method: 'get',
        path: '/history',
        alias: 'getDeliveriesHistory',
        description: 'Fetch deliveries history',
        response: z.array(
            deliverySchema.omit({
                courier: true,
                manager: true,
            }),
        ),
        parameters: [
            {
                name: 'page',
                type: 'Query',
                schema: z.number().nullish(),
            },
            {
                name: 'limit',
                type: 'Query',
                schema: z.number().nullish(),
            },
        ],
        errors: deliveriesErrors,
    },
    {
        method: 'get',
        path: '/search',
        alias: 'searchDeliveriesByQuery',
        description: 'Search deliveries by query',
        response: z.array(deliverySchema),
        parameters: [
            {
                name: 'query',
                description: 'Search by query',
                type: 'Query',
                schema: z.string(),
            },
        ],
        errors: deliveriesErrors,
    },
]);
