import { apiClient, Delivery } from '@/shared/api';
import { createEffect } from 'effector';
import { ZodError } from 'zod';

/**
 * Defines the parameters for setting the status of a delivery.
 * @property {Delivery['id']} id - The ID of the delivery.
 * @property {Delivery['states']} state - The new state of the delivery.
 * @property {string} comment - The comment to set.
 */
export type SetDeliveryStatusParameters = {
    id: Delivery['id'];
    comment: string;
    state: Delivery['state'];
};

/**
 *  Response type of setting the status of a delivery.
 */
export type SetDeliveryStatusResponse = Delivery;

/**
 * Effect to set the status of a delivery.
 */
export const setDeliveryStatusFx = createEffect<
    SetDeliveryStatusParameters,
    SetDeliveryStatusResponse,
    Error
>(async ({ id, state, comment }) => {
    try {
        const data = { state, comment };
        const parameters = {
            params: {
                deliveryId: id,
            },
        };
        return await apiClient.setDeliveryState(data, parameters);
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            error.issues.map((issue) => {
                console.log(issue.message);
            });
        }
        throw new Error(error.message);
    }
});
