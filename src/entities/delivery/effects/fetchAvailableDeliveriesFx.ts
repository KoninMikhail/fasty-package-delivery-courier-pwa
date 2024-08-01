import { createEffect } from 'effector';
import { apiClient, deliverySchema } from '@/shared/api';
import { z } from 'zod';

export const GetAvailableDeliveriesByParametersSchema = z.object({
    fromDate: z.string().optional(),
    toDate: z.string().optional(),
    car: z.boolean().optional(),
    express: z.boolean().optional(),
    weightMin: z.number().optional(),
    weightMax: z.number().optional(),
    limit: z.number().optional(),
    page: z.number(),
});

export type GetAvailableDeliveriesByParameters = z.infer<
    typeof GetAvailableDeliveriesByParametersSchema
>;

export const GetAvailableDeliveriesResponseSchema = z.array(
    deliverySchema.omit({
        manager: true,
        courier: true,
        client: true,
        contact: true,
    }),
);

export type GetAvailableDeliveriesResponse = z.infer<
    typeof GetAvailableDeliveriesResponseSchema
>;

export const fetchAvailableDeliveriesFx = createEffect<
    GetAvailableDeliveriesByParameters,
    GetAvailableDeliveriesResponse
>({
    handler: async (parameters) => {
        const { fromDate, toDate, car, express, weightMin, weightMax, limit } =
            parameters || {};

        return apiClient.fetchAvailableAssignDeliveries({
            queries: {
                limit,
                from: fromDate || undefined,
                to: toDate || undefined,
                car,
                express,
                weightMin,
                weightMax,
            },
        });
    },
});
