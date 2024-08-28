import { createEffect } from 'effector';
import { apiClient, Delivery } from '@/shared/api';

/**
 * Effect to fetch a delivery by its ID. Handles known errors specifically.
 */
export const getDeliveryByIdFx = createEffect<Delivery['id'], Delivery>(
    async (deliveryId) => {
        return apiClient.fetchDeliveryById({
            params: { deliveryId },
        });
    },
);
