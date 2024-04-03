import { createEvent, createStore } from 'effector';
import { Delivery } from '@/shared/api';
import { getMyDeliveriesFx, setDeliveryStatus } from './effects';

export const addDelivery = createEvent<Delivery>();
export const removeDelivery = createEvent<Delivery>();

/**
 * Store to manage the state of deliveries.
 */
export const $myDeliveriesStore = createStore<Delivery[]>([])
    .on(getMyDeliveriesFx.doneData, (_, deliveries) => deliveries)
    .on(setDeliveryStatus.doneData, (state, payload) => {
        // Refactored to reduce repetition and improve clarity
        const shouldRemove = ['done', 'canceled'].includes(payload.states);
        const updatedStateWithoutPayload = state.filter(
            (item) => item.id !== payload.id,
        );

        if (shouldRemove) {
            return updatedStateWithoutPayload;
        }

        // If not removing, either update or add the delivery, avoiding adding if in 'created' state without existence check
        return [...updatedStateWithoutPayload, payload];
    })
    .on(addDelivery, (state, payload) => {
        return state.some((item) => item.id === payload.id)
            ? state.map((item) => (item.id === payload.id ? payload : item))
            : [...state, payload];
    })
    .on(removeDelivery, (state, payload) =>
        state.filter((item) => item.id !== payload.id),
    );
