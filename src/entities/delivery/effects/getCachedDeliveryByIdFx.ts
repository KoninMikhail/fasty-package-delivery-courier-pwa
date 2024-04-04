import { createEffect } from 'effector';
import { Delivery } from '@/shared/api';

/**
 * Defines the parameter type for retrieving a cached delivery by its ID.
 */
export type GetCachedDeliveryByIdParameters = {
    deliveryId: Delivery['id'];
    cache: Delivery[];
};

/**
 * Effect to retrieve a cached delivery by its ID or throws if not found.
 */
export const getCachedDeliveryByIdFx = createEffect(
    async ({ deliveryId, cache }: GetCachedDeliveryByIdParameters) => {
        const delivery = cache.find(
            (cachedDelivery) => cachedDelivery.id === deliveryId,
        );
        if (delivery) {
            return delivery;
        }
        throw new Error('NOT_FOUND_IN_CACHE');
    },
);
