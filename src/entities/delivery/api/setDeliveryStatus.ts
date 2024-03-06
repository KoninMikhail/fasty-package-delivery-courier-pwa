import { createEffect } from 'effector/effector.umd';
import { apiClient, Delivery } from '@/shared/api';

export type SetDeliveryStatusParameters = {
    id: Delivery['id'];
    comment: string;
    state: Delivery['states'];
};

export type SetDeliveryStatusResponse = Delivery;

export const setDeliveryStatus = createEffect<
    SetDeliveryStatusParameters,
    SetDeliveryStatusResponse,
    Error
>(async ({ id, state, comment }) => {
    try {
        const data = { states: state, comment };
        const parameters = {
            params: {
                deliveryId: id,
            },
        };
        return await apiClient.patchDelivery(data, parameters);
    } catch {
        throw new Error('Error while setting delivery status');
    }
});
