import { z } from 'zod';
import { createEffect } from 'effector';
import { apiClient, UpcomingDelivery } from '@/shared/api';
import { MAX_WEIGHT_KG } from '../config';

export const GetAvailableDeliveriesByParametersSchema = z.object({
    fromDate: z.string().optional(),
    toDate: z.string().optional(),
    type: z.enum(['car', 'foot', 'unset']).optional(),
    express: z.boolean().optional(),
    weight: z.tuple([z.number(), z.number()]).optional(),
    limit: z.number().optional(),
    page: z.number(),
});

export type GetAvailableDeliveriesByParameters = z.infer<
    typeof GetAvailableDeliveriesByParametersSchema
>;

export const fetchAvailableDeliveriesFx = createEffect<
    GetAvailableDeliveriesByParameters,
    UpcomingDelivery[]
>({
    handler: async (parameters) => {
        const { fromDate, toDate, type, express, weight, limit, page } =
            parameters || {};

        return apiClient.fetchAvailableAssignDeliveries({
            queries: {
                page,
                limit,
                dateFrom: fromDate || undefined,
                dateTo: toDate || undefined,
                car:
                    type === 'car' ? true : type === 'foot' ? false : undefined,
                express: express === true ? true : undefined,
                weightMin: weight[0] === 0 ? undefined : weight[0],
                weightMax: weight[1] >= MAX_WEIGHT_KG ? undefined : weight[1],
            },
        });
    },
});
