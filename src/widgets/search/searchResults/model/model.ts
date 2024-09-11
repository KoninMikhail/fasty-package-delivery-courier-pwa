import { createEvent, createStore, sample } from 'effector';
import { FetchDeliveriesByQuery } from '@/features/delivery/fetchDeliveriesByQuery';
import { and, delay, not } from 'patronum';
import { sharedLibTypeGuards } from '@/shared/lib';
import { searchDeliveriesByQueryFx } from './effects';
import { $searchResults, setQuery, setResults } from './stores';

const { isEmpty } = sharedLibTypeGuards;

/**
 * Events
 */
export const init = createEvent();
export const initOffline = createEvent();
export const setOffline = createEvent<boolean>();
export const queryChanged = createEvent<string>();

/**
 * Network
 */

export const $isOffline = createStore<boolean>(false)
    .on(initOffline, () => true)
    .on(setOffline, (_, isOffline) => isOffline)
    .reset(init);

/**
 * Data
 */

export const fetchDeliveriesByQueryModel =
    FetchDeliveriesByQuery.factory.createModel({
        debounceTime: 300,
        minQueryLength: 1,
        provider: searchDeliveriesByQueryFx,
    });

sample({
    clock: delay(queryChanged, 300),
    source: not($isOffline),
    filter: (allowed) => allowed,
    fn: (_, query) => query,
    target: fetchDeliveriesByQueryModel.queryChanged,
});

sample({
    clock: queryChanged,
    target: setQuery,
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
    target: initCompleted,
});

sample({
    clock: fetchDeliveriesByQueryModel.deliveriesFetched,
    source: $isInitialized,
    filter: (isInitialized) => !isInitialized,
    target: initCompleted,
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
