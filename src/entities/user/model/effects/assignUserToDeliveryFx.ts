import { apiClient, Delivery } from '@/shared/api';
import { createEffect } from 'effector';

/**
 *  Response type of assigning a user to a delivery.
 */
export type AssignUserToDeliveryResponse = Delivery;

/**
 * Effect to retrieve a cached delivery by its ID or throws if not found.
 */
export const assignUserToDeliveryFx = createEffect<
    Delivery['id'],
    AssignUserToDeliveryResponse,
    Error
>(async (deliveryId) => {
    try {
        return await apiClient.assignUserToDelivery(undefined, {
            params: {
                deliveryId,
            },
        });
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});
