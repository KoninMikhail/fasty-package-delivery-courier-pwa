import { apiClient, Delivery } from '@/shared/api';
import { createEffect } from 'effector';
import { ZodError } from 'zod';
import { isAxiosError } from 'axios';

export const getDeliveryByIdFx = createEffect(async (id: Delivery['id']) => {
    try {
        return await apiClient.fetchDeliveryById({
            params: { deliveryId: id },
        });
    } catch (error: unknown) {
        const zodError = error instanceof ZodError;
        console.log(error);
        if (zodError) {
            // eslint-disable-next-line no-console
            error.issues.map((issue) => console.error(issue));
            throw new TypeError(`Failed to fetch delivery: ${error.message}`);
        }

        if (isAxiosError(error)) {
            if (error.response?.status === 404) {
                throw new Error('DELIVERY_NOT_FOUND');
            }
            throw new Error(error.message);
        }

        throw error;
    }
});
