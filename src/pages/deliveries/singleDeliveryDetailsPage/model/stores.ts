import { Delivery } from '@/shared/api';
import { createEvent, createStore } from 'effector';
import { initialDelivery } from '@/pages/deliveries/singleDeliveryDetailsPage/data';
import { persist } from 'effector-storage/local';

export const setDeliveryDetails = createEvent<Delivery>();
export const updateDeliveryDetails = createEvent<Partial<Delivery>>();
export const resetDeliveryDetails = createEvent();

/**
 * Current page delivery details
 */
export const $pageDeliveryDetails = createStore<Delivery>(initialDelivery)
    .on(setDeliveryDetails, (_, delivery) => delivery)
    .on(updateDeliveryDetails, (delivery, update) => {
        if (!delivery) return null;
        return {
            ...delivery,
            ...update,
        };
    })
    .reset(resetDeliveryDetails);

/**
 * Cache
 */
export const addDeliveryDetails = createEvent<Delivery>();
export const purgeDeliveryFromCache = createEvent<Delivery['id']>();
export const $pageDeliveryDetailsCache = createStore<Delivery[]>([])
    .on(addDeliveryDetails, (state, payload) => {
        const isAlreadyCached = state.some((x) => x.id === payload.id);
        if (isAlreadyCached) {
            return state.map((delivery) => {
                if (delivery.id === payload.id) {
                    return {
                        ...delivery,
                        ...payload,
                    };
                }
                return delivery;
            });
        }
        return [...state, payload];
    })
    .on(purgeDeliveryFromCache, (state, deliveryId) =>
        state.filter((x) => x.id !== deliveryId),
    );

persist({ store: $pageDeliveryDetails, key: 'deliveryDetails' });
