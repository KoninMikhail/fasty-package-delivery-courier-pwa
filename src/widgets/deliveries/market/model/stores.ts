import { createEvent, createStore } from 'effector';
import { DeliveryType, UpcomingDelivery } from '@/shared/api';
import { DatePeriod } from '@/shared/ui/components/forms/horizontal-date-picker/types';
import { isAfter } from 'date-fns';
import { debug } from 'patronum';
import { MAX_WEIGHT_KG } from '../config';

/**
 * Deliveries store
 */
export const setDeliveries = createEvent<UpcomingDelivery[]>();
export const addDeliveries = createEvent<UpcomingDelivery[]>();
export const clearDeliveries = createEvent();
export const updateSingleDelivery = createEvent<Partial<UpcomingDelivery>>();
export const $outputDeliveriesStore = createStore<UpcomingDelivery[]>([])
    .on(setDeliveries, (_, payload) => payload)
    .on(updateSingleDelivery, (state, payload) => {
        const index = state.findIndex((delivery) => delivery.id === payload.id);
        if (index === -1) return state;
        const updatedDelivery = { ...state[index], ...payload };
        return [
            ...state.slice(0, index),
            updatedDelivery,
            ...state.slice(index + 1),
        ];
    })
    .on(addDeliveries, (state, payload) => [...state, ...payload])
    .reset(clearDeliveries);

/**
 * Filters
 */
export const setDatesRange = createEvent<Optional<DatePeriod>>();
export const resetDatesRange = createEvent();
export const $datesRange = createStore<Optional<DatePeriod>>(null)
    .on(setDatesRange, (state, payload) => {
        if (!payload) return null;
        return {
            ...state,
            ...payload,
            dateFrom: isAfter(payload.dateFrom, payload.toDate)
                ? payload.toDate
                : payload.dateFrom,
            toDate: isAfter(payload.dateFrom, payload.toDate)
                ? payload.dateFrom
                : payload.toDate,
        };
    })
    .reset(resetDatesRange);

export const setWeight = createEvent<[number, number]>();
export const resetWeight = createEvent();
export const $weight = createStore<[number, number]>([0, MAX_WEIGHT_KG])
    .on(setWeight, (_, payload) => payload)
    .reset(resetWeight);

export const setExpress = createEvent<boolean>();
export const resetExpress = createEvent();
export const $express = createStore<boolean>(false)
    .on(setExpress, (_, payload) => payload)
    .reset(resetExpress);

export const setDeliveryType = createEvent<DeliveryType>();
export const resetDeliveryType = createEvent();
export const $deliveryType = createStore<Set<DeliveryType>>(new Set(['unset']))
    .on(setDeliveryType, (state, selection) => {
        console.log('wok');
        const newState = new Set(state);
        newState.clear();
        newState.add(selection);
        return newState;
    })
    .reset(resetDeliveryType);
debug({
    $deliveryType,
});
