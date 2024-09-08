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
    .reset(clearDeliveries);

/**
 * Filters
 */
export const datesRangePicked = createEvent<DatePeriod>();
export const expressChanged = createEvent<boolean>();
export const deliveryTypeChanged = createEvent<DeliveryType>();
export const weightRangeSelected = createEvent<[number, number]>();
export const weightRangeChanged = createEvent();

export const filtersChanged = createEvent();
export const resetFilters = createEvent();

export const $datesRange = createStore<Optional<DatePeriod>>(null)
    .on(datesRangePicked, (state, payload) => {
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
    .reset(resetFilters);

export const $weight = createStore<[number, number]>([0, MAX_WEIGHT_KG])
    .on(weightRangeSelected, (_, payload) => payload)
    .reset(resetFilters);

export const $express = createStore<boolean>(false)
    .on(expressChanged, (_, payload) => payload)
    .reset(resetFilters);

export const $deliveryType = createStore<Set<DeliveryType>>(new Set(['unset']))
    .on(deliveryTypeChanged, (state, selection) => {
        const newState = new Set(state);
        newState.clear();
        newState.add(selection);
        return newState;
    })
    .reset(resetFilters);

debug({
    dates: $datesRange,
    weight: $weight,
    express: $express,
    deliveryType: $deliveryType,
});
