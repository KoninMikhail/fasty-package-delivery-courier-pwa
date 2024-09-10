import { Delivery } from '@/shared/api';
import { createEvent, createStore } from 'effector';

export const setDelivery = createEvent<Delivery>();
export const clearDelivery = createEvent();
export const $delivery = createStore<Optional<Delivery>>(null)
    .on(setDelivery, (_, delivery) => delivery)
    .reset(clearDelivery);
