import { makeApi, makeErrors } from '@zodios/core';
import { z } from 'zod';
import { transformPathToUrl } from '@/shared/api/uilts/transformPathToUrl';
import {
    changeDeliveryStateSchema,
    deliverySchema,
    historyDeliverySchema,
    upcomingDeliverySchema,
} from '../schemas';

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
            { name: 'page', type: 'Query', schema: z.number().optional() },
            {
                name: 'limit',
                type: 'Query',
                schema: z.number().optional(),
            },
            {
                name: 'dateFrom',
                type: 'Query',
                schema: z.string().optional(),
            },
            {
                name: 'dateTo',
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
        response: z.array(upcomingDeliverySchema),
        errors: deliveriesErrors,
    },
    {
        method: 'get',
        path: '/item/:deliveryId',
        alias: 'fetchDeliveryById',
        description: 'Fetch a delivery by its ID',
        response: deliverySchema.transform((delivery) => {
            const managerAvatarUrl = delivery.manager.avatar_src;
            const courierAvatarUrl = delivery.courier?.avatar_src;
            if (managerAvatarUrl || courierAvatarUrl) {
                return {
                    ...delivery,
                    manager: {
                        ...delivery.manager,
                        avatar_src: managerAvatarUrl
                            ? transformPathToUrl(managerAvatarUrl)
                            : null,
                    },
                    courier: delivery.courier
                        ? {
                              ...delivery.courier,
                              avatar_src: courierAvatarUrl
                                  ? transformPathToUrl(courierAvatarUrl)
                                  : null,
                          }
                        : null,
                };
            }
            return delivery;
        }),
        errors: deliveriesErrors,
    },
    {
        method: 'post',
        path: '/item/:deliveryId/assign',
        alias: 'assignUserToDelivery',
        description: 'Assign a user to a delivery',
        parameters: [],
        response: deliverySchema.transform((delivery) => {
            const managerAvatarUrl = delivery.manager.avatar_src;
            const courierAvatarUrl = delivery.courier?.avatar_src;
            if (managerAvatarUrl || courierAvatarUrl) {
                return {
                    ...delivery,
                    manager: {
                        ...delivery.manager,
                        avatar_src: managerAvatarUrl
                            ? transformPathToUrl(managerAvatarUrl)
                            : null,
                    },
                    courier: delivery.courier
                        ? {
                              ...delivery.courier,
                              avatar_src: courierAvatarUrl
                                  ? transformPathToUrl(courierAvatarUrl)
                                  : null,
                          }
                        : null,
                };
            }
            return delivery;
        }),
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
                schema: changeDeliveryStateSchema,
            },
        ],
        response: deliverySchema.transform((delivery) => {
            const managerAvatarUrl = delivery.manager.avatar_src;
            const courierAvatarUrl = delivery.courier?.avatar_src;
            if (managerAvatarUrl || courierAvatarUrl) {
                return {
                    ...delivery,
                    manager: {
                        ...delivery.manager,
                        avatar_src: managerAvatarUrl
                            ? transformPathToUrl(managerAvatarUrl)
                            : null,
                    },
                    courier: delivery.courier
                        ? {
                              ...delivery.courier,
                              avatar_src: courierAvatarUrl
                                  ? transformPathToUrl(courierAvatarUrl)
                                  : null,
                          }
                        : null,
                };
            }
            return delivery;
        }),
        errors: deliveriesErrors,
    },
    {
        method: 'get',
        path: '/my',
        alias: 'getMyDeliveries',
        description: 'Fetch active deliveries',
        parameters: [
            {
                name: 'limit',
                type: 'Query',
                schema: z.number().optional(),
            },
        ],
        response: z.array(deliverySchema).transform((deliveries) => {
            return deliveries.map((delivery) => {
                const managerAvatarUrl = delivery.manager.avatar_src;
                const courierAvatarUrl = delivery.courier?.avatar_src;
                if (managerAvatarUrl || courierAvatarUrl) {
                    return {
                        ...delivery,
                        manager: {
                            ...delivery.manager,
                            avatar_src: managerAvatarUrl
                                ? transformPathToUrl(managerAvatarUrl)
                                : null,
                        },
                        courier: delivery.courier
                            ? {
                                  ...delivery.courier,
                                  avatar_src: courierAvatarUrl
                                      ? transformPathToUrl(courierAvatarUrl)
                                      : null,
                              }
                            : null,
                    };
                }
                return delivery;
            });
        }),
        errors: deliveriesErrors,
    },
    {
        method: 'get',
        path: '/history',
        alias: 'getDeliveriesHistory',
        description: 'Fetch deliveries history',
        response: z.array(historyDeliverySchema),
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
    {
        method: 'get',
        path: '/search/queries',
        alias: 'getUserSearchQueriesHistory',
        description: 'Fetch user search queries history',
        response: z.array(z.string()),
        errors: deliveriesErrors,
    },
    {
        method: 'delete',
        path: '/search/queries/:query',
        alias: 'removeUserSearchQueryItem',
        description: 'Remove user search query item',
        parameters: [
            {
                name: 'query',
                type: 'Path',
                schema: z.string(),
            },
        ],
        response: z.unknown(),
        errors: deliveriesErrors,
    },
]);
