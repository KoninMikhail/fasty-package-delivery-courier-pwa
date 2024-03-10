import { apiClient, Delivery, User } from '@/shared/api';
import { createEffect } from 'effector';

/**
 * Defines the parameters for assigning a user to a delivery.
 * @property {User['id']} userId - The ID of the user to assign.
 * @property {Delivery['id']} deliveryId - The ID of the delivery.
 */
export type AssignUserToDeliveryParameters = {
    userId: User['id'];
    deliveryId: Delivery['id'];
};

/**
 *  Response type of assigning a user to a delivery.
 */
export type AssignUserToDeliveryResponse = Delivery;

/**
 * Effect to retrieve a cached delivery by its ID or throws if not found.
 */
export const assignUserToDeliveryFx = createEffect<
    AssignUserToDeliveryParameters,
    AssignUserToDeliveryResponse,
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
