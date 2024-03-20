import { createEvent, createStore, sample } from 'effector';
import { Delivery } from '@/shared/api';
import { AssignDeliveryToUser } from '@/features/delivery/assignDeliveryToUser';
import {
    FilterDeliveriesByParameters,
    FilterDeliveriesByParametersModel,
} from '@/features/delivery/filterDeliveriesByParams';
import { assignUserToDeliveryFx } from '@/entities/delivery';
import { isAfter } from 'date-fns/isAfter';
import { fetchAvailableDeliveriesFx } from './effects';

type DatesRange = {
    dateFrom: string;
    toDate: string;
};

/**
 * Events
 */
export const initMarket = createEvent(); // full reset of the market
export const reloadMarketContent = createEvent(); // reload only the content of the market
export const deliveriesDatesRangeChanged = createEvent<Nullable<DatesRange>>();

/**
 * Data
 */
export const $deliveriesFetched = createStore<Delivery[]>([]);
export const deliveriesFilterFeatureModel: FilterDeliveriesByParametersModel =
    FilterDeliveriesByParameters.factory.createModel({
        sourceStore: $deliveriesFetched,
    });

const $deliveriesDatesRange = createStore<DatesRange>({
    dateFrom: '',
    toDate: '',
}).on(deliveriesDatesRangeChanged, (state, payload) => {
    if (!payload) return { ...state, dateFrom: '', toDate: '' };

    if (isAfter(payload.dateFrom, payload.toDate)) {
        return {
            ...state,
            dateFrom: payload.toDate,
            toDate: payload.dateFrom,
        };
    }
    return {
        ...state,
        ...payload,
    };
});

/**
 * Actions
 */
export const assignDeliveryToUserModel =
    AssignDeliveryToUser.factory.createModel({
        assignToDeliveryEffect: assignUserToDeliveryFx,
    });

/**
 * State
 */
export const $initialized = createStore(false).on(initMarket, () => true);
export const $isDeliveriesLoading = fetchAvailableDeliveriesFx.pending;
export const $error = createStore<Nullable<Error>>(null);
export const $$hasError = $error.map((error) => error !== null);
export const $$deliveriesEmpty = $deliveriesFetched.map(
    (deliveries) => deliveries.length === 0,
);

/**
 * Handlers
 */

sample({
    clock: [initMarket, reloadMarketContent],
    target: fetchAvailableDeliveriesFx,
});

sample({
    clock: $deliveriesDatesRange,
    fn: (dates) => ({ fromDate: dates.dateFrom, toDate: dates.toDate }),
    target: fetchAvailableDeliveriesFx,
});

sample({
    clock: fetchAvailableDeliveriesFx.doneData,
    target: $deliveriesFetched,
});

sample({
    clock: fetchAvailableDeliveriesFx.failData,
    target: $error,
});

/**
 * Exports
 */
export const $outputStore = deliveriesFilterFeatureModel.$filteredStore;
