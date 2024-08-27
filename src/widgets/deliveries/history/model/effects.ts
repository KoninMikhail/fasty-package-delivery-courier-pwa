import { createEffect } from 'effector';
import { apiClient, HistoryDelivery } from '@/shared/api';

export interface GetDeliveriesHistoryFxParameters {
    page: number;
    limit?: number;
}

export const getDeliveriesHistoryFx = createEffect<
    GetDeliveriesHistoryFxParameters,
    HistoryDelivery[]
>(async (queries) => {
    const { page, limit } = queries;
    return apiClient.getDeliveriesHistory({
        queries: {
            page,
            limit,
        },
    });
});
