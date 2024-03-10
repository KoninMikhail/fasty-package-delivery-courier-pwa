import { createEffect, Store } from 'effector';
import { Delivery } from '@/shared/api';

/**
 * Defines the parameter type for retrieving a cached delivery by its ID.
 * @property {Delivery['id']} deliveryId - The ID of the delivery to retrieve.
 * @property {Store<Delivery[]>} store - Effector store containing cached deliveries.
 */
export type GetCachedDeliveryByIdParameters = {
    deliveryId: Delivery['id'];
    store: Store<Delivery[]>;
};

/**
 * Effect to retrieve a cached delivery by its ID or throws if not found.
 */
export const getCachedDeliveryByIdFx = createEffect(
    async ({ deliveryId, store }: GetCachedDeliveryByIdParameters) => {
        const cache = store.getState();
        const delivery = cache.find(
            (cachedDelivery) => cachedDelivery.id === deliveryId,
        );
        if (delivery) {
            return delivery;
        }
        throw new Error('NOT_FOUND');
    },
);
