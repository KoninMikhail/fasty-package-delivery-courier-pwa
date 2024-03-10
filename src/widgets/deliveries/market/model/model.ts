import { createEvent, createStore, sample } from 'effector';
import { Delivery } from '@/shared/api';
import { AssignDeliveryToUser } from '@/features/delivery/assignDeliveryToUser';
import {
    FilterDeliveriesByParameters,
    FilterDeliveriesByParametersModel,
} from '@/features/delivery/filterDeliveriesByParams';
import { fetchAvailableDeliveriesFx, assignUserToDeliveryFx } from './effects';

type DatesRange = {
    dateStart: string;
    dateEnd: string;
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
    dateStart: '',
    dateEnd: '',
}).on(deliveriesDatesRangeChanged, (state, dates) => {
    if (!dates) return { ...state, dateStart: '', dateEnd: '' };
    if (dates.dateStart > dates.dateEnd) {
        return {
            ...state,
            dateStart: dates.dateEnd,
            dateEnd: dates.dateStart,
        };
    }
    return {
        ...state,
        ...dates,
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
    fn: (dates) => ({ fromDate: dates.dateStart, toDate: dates.dateEnd }),
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
