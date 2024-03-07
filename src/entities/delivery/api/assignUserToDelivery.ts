import { createEffect } from 'effector';
import { apiClient, Delivery, User } from '@/shared/api';

export type AssignUserToDeliveryParameters = {
    userId: User['id'];
    deliveryId: Delivery['id'];
};

export type AssignUserToDeliveryResponse = Delivery;

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
