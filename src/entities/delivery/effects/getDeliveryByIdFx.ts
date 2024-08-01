import { createEffect } from 'effector';
import { apiClient, Delivery } from '@/shared/api';
import { isAxiosError } from 'axios';
import { ZodError } from 'zod';

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
            const zodError = error instanceof ZodError;
            console.log(error);
            if (zodError) {
                // eslint-disable-next-line no-console
                error.issues.map((issue) => console.error(issue));
                throw new TypeError(
                    `Failed to fetch delivery: ${error.message}`,
                );
            }

            if (isAxiosError(error)) {
                if (error.response?.status === 404) {
                    throw new Error('DELIVERY_NOT_FOUND');
                }
                throw new Error(error.message);
            }

            throw error;
        }
    },
);
