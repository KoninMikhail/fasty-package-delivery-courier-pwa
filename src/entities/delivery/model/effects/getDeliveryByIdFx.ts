import { createEffect } from 'effector';
import { apiClient, Delivery } from '@/shared/api';
import { AxiosError } from 'axios';

/**
 * Defines the parameter type for the `getDeliveryByIdFx` effect.
 * @property {Delivery['id']} deliveryId - The unique identifier of a delivery.
 */
export interface GetDeliveryByIdParameters {
    deliveryId: Delivery['id'];
}

/**
 * Effect to fetch a delivery by its ID. Handles known errors specifically.
 */
export const getDeliveryByIdFx = createEffect(
    async ({ deliveryId }: GetDeliveryByIdParameters) => {
        try {
            return await apiClient.fetchDeliveryById({
                params: { deliveryId },
            });
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response.status === 404) {
                throw new Error('DELIVERY_NOT_FOUND');
            }
            throw error;
        }
    },
);
