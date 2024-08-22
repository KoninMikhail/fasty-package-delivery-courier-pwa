import { Delivery } from '@/shared/api';
import { createEvent, createStore } from 'effector';
import { initialDelivery } from '@/pages/deliveries/singleDeliveryDetailsPage/data';

export const setDeliveryDetails = createEvent<Delivery>();
export const updateDeliveryDetails = createEvent<Partial<Delivery>>();
export const resetDeliveryDetails = createEvent();

export const $pageDeliveryDetails = createStore<Optional<Delivery>>(
    initialDelivery,
)
    .on(setDeliveryDetails, (_, delivery) => delivery)
    .on(updateDeliveryDetails, (delivery, update) => {
        if (!delivery) return null;
        return {
            ...delivery,
            ...update,
        };
    })
    .reset(resetDeliveryDetails);
