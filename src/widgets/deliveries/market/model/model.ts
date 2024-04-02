import { createEvent, createStore, sample } from 'effector';
import { Delivery } from '@/shared/api';
import { AssignDeliveryToUser } from '@/features/delivery/assignDeliveryToUser';
import {
    FilterDeliveriesByParameters,
    FilterDeliveriesByParametersModel,
} from '@/features/delivery/filterDeliveriesByParams';
import { isAfter } from 'date-fns/isAfter';
import { assignUserToDeliveryFx } from '@/entities/user';
import { fetchAvailableDeliveriesFx } from './effects';

type DatesRange = {
    dateFrom: string;
    toDate: string;
};

/**
 * Global
 */
export const init = createEvent(); // full reset of the market
export const fetchData = createEvent(); // refetch data
export const datesPicked = createEvent<Nullable<DatesRange>>();

/**
 * init
 */
sample({
    clock: [init, fetchData],
    target: fetchAvailableDeliveriesFx,
});

/**
 * Data
 */
export const $fetchedData = createStore<Delivery[]>([]).on(
    fetchAvailableDeliveriesFx.doneData,
    (_, payload) => payload,
);

/**
 * Actions
 */
export const assignDeliveryToUserModel =
    AssignDeliveryToUser.factory.createModel({
        assignToDeliveryFx: assignUserToDeliveryFx,
    });

/**
 * State
 */
export const $assignDeliveriesCount = createStore<number>(0)
    .on(assignUserToDeliveryFx.done, (state) => state + 1)
    .reset(init);
export const $isDeliveriesLoading = fetchAvailableDeliveriesFx.pending;
export const $error = createStore<Nullable<Error>>(null).on(
    fetchAvailableDeliveriesFx.failData,
    (_, error) => error,
);
export const $$hasError = $error.map((error) => error !== null);
export const $$deliveriesEmpty = $fetchedData.map(
    (deliveries) => deliveries.length === 0,
);

/**
 * Date picker
 */
const initialDatesRange: DatesRange = {
    dateFrom: '',
    toDate: '',
};
const $deliveriesDatesRange = createStore<DatesRange>(initialDatesRange).on(
    datesPicked,
    (state, payload) => {
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
    },
);

sample({
    clock: $deliveriesDatesRange,
    fn: (dates) => ({ fromDate: dates.dateFrom, toDate: dates.toDate }),
    target: fetchAvailableDeliveriesFx,
});

/**
 * Filter
 */

export const deliveriesFilterFeatureModel: FilterDeliveriesByParametersModel =
    FilterDeliveriesByParameters.factory.createModel({
        sourceStore: $fetchedData,
    });

/**
 * Exports
 */
export const $outputStore = deliveriesFilterFeatureModel.$filteredStore;
