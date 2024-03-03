import {
    makeApi,
    makeErrors,
    ZodiosRequestOptionsByPath,
    ZodiosResponseByPath,
} from '@zodios/core';
import { z } from 'zod';

export const deliverySchema = z.object({
    address_id: z.number(),
    car: z.boolean(),
    client_id: z.number(),
    comment: z.string(),
    contact_id: z.number(),
    contents: z.string(),
    deleted: z.boolean(),
    date: z.string(),
    express: z.boolean(),
    id: z.number(),
    manager_id: z.number(),
    order_id: z.number(),
    states: z.string(),
    time_end: z.string(),
    time_start: z.string(),
    order: z.object({
        id: z.number(),
        client_id: z.number(),
        contact_id: z.number(),
        address_id: z.number(),
        description: z.string(),
        cost: z.string(),
        state: z.string(),
        payment: z.string(),
        payment_type: z.string(),
        deleted: z.boolean(),
        created_at: z.string(),
        updated_at: z.string(),
        submanager: z.null(),
        deadline: z.string(),
    }),
    weight: z.string(),
    courier: z.object({
        id: z.number(),
        gender: z.string(),
        email: z.string(),
        role: z.string(),
        email_verified_at: z.string(),
        deleted: z.boolean(),
        created_at: z.string(),
        updated_at: z.string(),
        user_role: z.object({
            name: z.string(),
            capabilities: z.array(z.unknown()),
            states: z.array(z.unknown()),
        }),
        firstName: z.string(),
        lastName: z.string(),
        backColor: z.string(),
        foreColor: z.string(),
    }),
    courier_id: z.number(),
    contact: z.object({
        id: z.number(),
        client_id: z.number(),
        name: z.string(),
        email: z.string(),
        job: z.string(),
        default: z.boolean(),
        deleted: z.boolean(),
        phone: z.string(),
    }),
    client: z.object({
        id: z.number(),
        client_type: z.string(),
        name: z.string(),
        deleted: z.boolean(),
        created_at: z.string(),
        updated_at: z.string(),
        contacts: z.array(
            z.object({
                id: z.number(),
                client_id: z.number(),
                name: z.string(),
                email: z.string(),
                job: z.string(),
                default: z.boolean(),
                deleted: z.boolean(),
                phone: z.string(),
            }),
        ),
        addresses: z.array(
            z.object({
                id: z.number(),
                client_id: z.number(),
                delivery_type: z.string(),
                region: z.null(),
                city: z.null(),
                metro: z.null(),
                address: z.null(),
                point_id: z.null(),
                cdek_type: z.null(),
                default: z.boolean(),
                deleted: z.boolean(),
            }),
        ),
        client_data: z.object({
            id: z.number(),
            created_at: z.string(),
            updated_at: z.string(),
            full_name: z.string(),
            legal_address: z.string(),
            fact_address: z.string(),
            organization_phone: z.string(),
            kpp: z.string(),
            okpo: z.string(),
            inn: z.string(),
            okonh: z.string(),
            okved: z.string(),
            okud: z.string(),
            ogrn: z.string(),
            director: z.string(),
            client_id: z.number(),
        }),
    }),
    address: z.object({
        id: z.number(),
        client_id: z.number(),
        delivery_type: z.string(),
        region: z.null(),
        city: z.null(),
        metro: z.null(),
        address: z.null(),
        point_id: z.null(),
        cdek_type: z.null(),
        default: z.boolean(),
        deleted: z.boolean(),
    }),
    manager: z.object({
        id: z.number(),
        gender: z.string(),
        email: z.string(),
        role: z.string(),
        email_verified_at: z.null(),
        deleted: z.boolean(),
        created_at: z.string(),
        updated_at: z.string(),
        user_role: z.object({
            name: z.string(),
            capabilities: z.array(z.string()),
            states: z.array(z.string()),
        }),
        firstName: z.string(),
        lastName: z.string(),
        backColor: z.string(),
        foreColor: z.string(),
    }),
});

export type Delivery = z.infer<typeof deliverySchema>;

export const deliveriesErrors = makeErrors([]);

export const deliveriesApi = makeApi([
    {
        method: 'get',
        path: '/',
        alias: 'fetchUpcomingDeliveries',
        description: 'Fetch upcoming deliveries',
        response: z.any().transform((data) => {
            return data.filter(
                (item) => item.address.delivery_type === 'courier',
            );
        }),

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
        response: z.any(),
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
        response: z.any(),
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

export type DeliveriesApi = typeof deliveriesApi;

export type GetDeliveryById = ZodiosResponseByPath<
    DeliveriesApi,
    'get',
    '/:deliveryId'
>;

export type RequestAssignToCourier = ZodiosRequestOptionsByPath<
    DeliveriesApi,
    'patch',
    '/:deliveryId'
>;
