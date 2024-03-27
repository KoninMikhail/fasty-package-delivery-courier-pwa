import { makeApi, makeErrors } from '@zodios/core';
import { z } from 'zod';
import { format, parse, isValid } from 'date-fns';
import { deliverySchema } from '../schemas';
import { API_BASE_URL } from '../instance';

const dateFormat = 'yyyy-MM-dd';

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
        response: z.array(deliverySchema).transform((data) =>
            data
                .filter(
                    (delivery) => delivery.address.delivery_type === 'courier',
                )
                .map((item) => {
                    return {
                        ...item,
                        manager: item.manager
                            ? {
                                  ...item.manager,
                                  avatar_src: item.manager?.avatar_src
                                      ? `${API_BASE_URL}${item.manager.avatar_src}`
                                      : null,
                              }
                            : null,
                        courier: item.courier
                            ? {
                                  ...item.courier,
                                  avatar_src: item.courier?.avatar_src
                                      ? `${API_BASE_URL}${item.courier.avatar_src}`
                                      : null,
                              }
                            : null,
                    };
                }),
        ),
    },
    {
        method: 'get',
        path: '/:deliveryId',
        alias: 'fetchDeliveryById',
        description: 'Fetch a delivery by its ID',
        response: deliverySchema.transform((item) => ({
            ...item,
            manager: item.manager
                ? {
                      ...item.manager,
                      avatar_src: item?.manager?.avatar_src
                          ? `${API_BASE_URL}${item.manager.avatar_src}`
                          : null,
                  }
                : null,
            courier: item.courier
                ? {
                      ...item.courier,
                      avatar_src: item?.courier?.avatar_src
                          ? `${API_BASE_URL}${item.courier.avatar_src}`
                          : null,
                  }
                : null,
        })),
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
        response: deliverySchema.transform((item) => ({
            ...item,
            manager: item.manager
                ? {
                      ...item.manager,
                      avatar_src: item.manager?.avatar_src
                          ? `${API_BASE_URL}${item.manager.avatar_src}`
                          : null,
                  }
                : null,
            courier: item.courier
                ? {
                      ...item.courier,
                      avatar_src: item.courier?.avatar_src
                          ? `${API_BASE_URL}${item.courier.avatar_src}`
                          : null,
                  }
                : null,
        })),
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
            )
            .transform((deliveries) => {
                deliveries.map((item) => ({
                    ...item,
                    manager: item.manager
                        ? {
                              ...item.manager,
                              avatar_src: item.manager?.avatar_src
                                  ? `${API_BASE_URL}${item.manager.avatar_src}`
                                  : null,
                          }
                        : null,
                    courier: item.courier
                        ? {
                              ...item.courier,
                              avatar_src: item.courier?.avatar_src
                                  ? `${API_BASE_URL}${item.courier.avatar_src}`
                                  : null,
                          }
                        : null,
                }));
            }),
    },
    {
        method: 'get',
        path: '/history',
        alias: 'getDeliveriesHistory',
        description: 'Fetch deliveries history',
        response: z.array(deliverySchema),
        parameters: [
            {
                name: 'from',
                type: 'Query',
                schema: z
                    .string()
                    .refine(
                        (value) => {
                            const parsedDate = parse(
                                value,
                                dateFormat,
                                new Date(),
                            );
                            return (
                                isValid(parsedDate) &&
                                value === format(parsedDate, dateFormat)
                            );
                        },
                        {
                            message: `Date must be in the format ${dateFormat}`,
                        },
                    )
                    .optional(),
            },
            {
                name: 'to',
                type: 'Query',
                schema: z
                    .string()
                    .refine(
                        (value) => {
                            const parsedDate = parse(
                                value,
                                dateFormat,
                                new Date(),
                            );
                            return (
                                isValid(parsedDate) &&
                                value === format(parsedDate, dateFormat)
                            );
                        },
                        {
                            message: `Date must be in the format ${dateFormat}`,
                        },
                    )
                    .optional(),
            },
        ],
    },
    {
        method: 'get',
        path: '/search',
        alias: 'searchDeliveriesByQuery',
        description: 'Search deliveries by query',
        response: z.array(deliverySchema).transform((deliveries) => {
            return deliveries.map((item) => ({
                ...item,
                manager: item.manager
                    ? {
                          ...item.manager,
                          avatar_src: item.manager?.avatar_src
                              ? `${API_BASE_URL}${item.manager.avatar_src}`
                              : null,
                      }
                    : null,
                courier: item.courier
                    ? {
                          ...item.courier,
                          avatar_src: item.courier?.avatar_src
                              ? `${API_BASE_URL}${item.courier.avatar_src}`
                              : null,
                      }
                    : null,
            }));
        }),
        parameters: [
            {
                name: 'query',
                description: 'Search by query',
                type: 'Query',
                schema: z.string(),
            },
        ],
    },
]);
