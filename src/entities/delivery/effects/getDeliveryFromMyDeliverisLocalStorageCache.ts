import { createEffect } from 'effector';
import { Delivery } from '@/shared/api';
import { z } from 'zod';
import { LOCAL_STORAGE_SINGLE_PAGE_CACHE_KEY } from '../config';

export const getDeliveryFromMyDeliverisLocalStorageCache = createEffect<
    Delivery['id'],
    Delivery
>(async (id) => {
    const existingData = localStorage.getItem(
        LOCAL_STORAGE_SINGLE_PAGE_CACHE_KEY,
    );

    try {
        if (existingData) {
            const parsedData = existingData
                ? (JSON.parse(existingData) as Delivery[])
                : [];
            const delivery = parsedData.find(
                (cachedDelivery) => cachedDelivery.id === id,
            );
            if (delivery) {
                return delivery;
                /* return deliverySchema.parse(delivery); */
            }
        }
        throw new Error('NOT_FOUND_IN_CACHE');
    } catch (error: unknown) {
        if (error instanceof SyntaxError) {
            console.error('Invalid JSON:', error.message);
        } else if (error instanceof z.ZodError) {
            console.error('Validation error:', error.errors);
        } else {
            console.error('Unexpected error:', error);
        }
        throw new Error('NOT_FOUND_IN_CACHE');
    }
});
