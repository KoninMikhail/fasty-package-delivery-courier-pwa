import { createEffect } from 'effector';
import {
    apiClient,
    GetAvailableDeliveriesParams,
    GetAvailableDeliveriesResponse,
} from '@/shared/api';

export const fetchAvailableDeliveriesFx = createEffect<
    GetAvailableDeliveriesParams,
    GetAvailableDeliveriesResponse,
    Error
>(async (dates) => {
    if (
        dates &&
        dates.fromDate &&
        dates.toDate &&
        dates.fromDate.length > 0 &&
        dates.toDate.length > 0
    ) {
        return apiClient.fetchAvailableAssignDeliveries({
            queries: {
                from: dates.fromDate,
                to: dates.toDate,
            },
        });
    }
    return apiClient.fetchAvailableAssignDeliveries();
});
