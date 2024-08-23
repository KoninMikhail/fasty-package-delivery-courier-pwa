import { createEvent, createStore, sample } from 'effector';
import { FetchDeliveriesByQuery } from '@/features/delivery/fetchDeliveriesByQuery';
import { and, delay } from 'patronum';
import { sharedLibTypeGuards } from '@/shared/lib';
import { searchDeliveriesByQueryFx } from './effects';
import { $searchResults, setResults } from './stores';

const { isEmpty } = sharedLibTypeGuards;

/**
 * Events
 */
export const init = createEvent();
export const initOffline = createEvent();
export const setOnline = createEvent<boolean>();
export const queryChanged = createEvent<string>();

/**
 * Network
 */

export const $isOnline = createStore<boolean>(true)
    .on(initOffline, () => false)
    .on(setOnline, (_, isOnline) => isOnline)
    .reset(init);

/**
 * Data
 */

export const fetchDeliveriesByQueryModel =
    FetchDeliveriesByQuery.factory.createModel({
        debounceTime: 300,
        minQueryLength: 3,
        provider: searchDeliveriesByQueryFx,
    });

sample({
    clock: delay(queryChanged, 300),
    source: $isOnline,
    filter: (isOnline) => isOnline,
    fn: (_, query) => query,
    target: fetchDeliveriesByQueryModel.queryChanged,
});

sample({
    clock: fetchDeliveriesByQueryModel.deliveriesFetched,
    target: setResults,
});

/**
 * Initialization
 */
const initCompleted = createEvent();

export const $isInitialized = createStore<boolean>(false)
    .on(initCompleted, () => true)
    .reset(init);

sample({
    clock: delay(init, 300),
    target: fetchDeliveriesByQueryModel.queryChanged.prepend(() => ''),
});

sample({
    clock: delay(initOffline, 300),
    target: initCompleted,
});

/**
 * States
 */
export const $isEmptyResults = and(
    $isInitialized,
    $searchResults.map((results) => isEmpty(results)),
);
export const $isEmptyQuery = and(
    fetchDeliveriesByQueryModel.$query.map((query) => isEmpty(query)),
    $isInitialized,
);

export const $isLoading = fetchDeliveriesByQueryModel.$pending;

export const { $errors } = fetchDeliveriesByQueryModel;
