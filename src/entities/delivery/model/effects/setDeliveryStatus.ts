import { apiClient, Delivery } from '@/shared/api';
import { createEffect } from 'effector';

/**
 * Defines the parameters for setting the status of a delivery.
 * @property {Delivery['id']} id - The ID of the delivery.
 * @property {Delivery['states']} state - The new state of the delivery.
 * @property {string} comment - The comment to set.
 */
export type SetDeliveryStatusParameters = {
    id: Delivery['id'];
    comment: string;
    state: Delivery['states'];
};

/**
 *  Response type of setting the status of a delivery.
 */
export type SetDeliveryStatusResponse = Delivery;

/**
 * Effect to set the status of a delivery.
 */
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
