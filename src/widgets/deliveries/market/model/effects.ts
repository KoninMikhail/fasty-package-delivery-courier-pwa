import { createEffect } from 'effector';
import {
    apiClient,
    GetAvailableDeliveriesParams,
    GetAvailableDeliveriesResponse,
    PatchDeliveryToCourierParams,
    PatchDeliveryToCourierResponse,
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

export const assignUserToDeliveryFx = createEffect<
    PatchDeliveryToCourierParams,
    PatchDeliveryToCourierResponse,
    Error
>(async ({ userId, deliveryId }) => {
    return apiClient.patchDelivery(
        { courier_id: userId },
        {
            params: {
                deliveryId,
            },
        },
    );
});
