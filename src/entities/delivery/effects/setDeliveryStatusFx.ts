import { apiClient, ChangeDeliveryStateRequest, Delivery } from '@/shared/api';
import { createEffect } from 'effector';

/**
 * Effect to set the status of a delivery.
 */
export const setDeliveryStatusFx = createEffect<
    ChangeDeliveryStateRequest,
    Delivery,
    Error
>(async ({ id, state, comment }) => {
    console.log('setDeliveryStatusFx', { id, state, comment });

    const data = { state, comment };
    const parameters = {
        params: {
            deliveryId: id,
        },
    };
    return apiClient.setDeliveryState(data, parameters);
});
