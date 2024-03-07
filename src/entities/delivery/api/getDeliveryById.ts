import { createEffect } from 'effector';
import { apiClient, Delivery } from '@/shared/api';

type GetDeliveryByIdParameters = {
    deliveryId: Delivery['id'];
};

type GetDeliveryByIdResponse = Delivery;

export const getDeliveryById = createEffect<
    GetDeliveryByIdParameters,
    GetDeliveryByIdResponse,
    Error
>(async ({ deliveryId }) => {
    try {
        const respose = await apiClient.fetchDeliveryById({
            params: { deliveryId },
        });
        return respose;
    } catch {
        throw new Error('Error while fetching delivery details');
    }
});
