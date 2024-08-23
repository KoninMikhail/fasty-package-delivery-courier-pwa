import { combine, createEvent, createStore, restore, sample } from 'effector';
import { Delivery } from '@/shared/api';
import { sharedLibTypeGuards } from '@/shared/lib';
import { sessionModel } from '@/entities/viewer';
import { searchDeliveriesByQueryFx } from './effects';
import { PageState, SearchPageState } from '../types';

const { isEmpty } = sharedLibTypeGuards;

/**
 * Events
 */
export const queryChanged = createEvent<string>();

/**
 * Network state
 */

const { $$isOnline, $isAuthorized } = sessionModel;

/**
 * Query
 */
export const $searchQuery = createStore<string>('').on(
    queryChanged,
    (_, query) => query,
);

sample({
    clock: $searchQuery,
    filter: (query) => !isEmpty(query),
    target: searchDeliveriesByQueryFx,
});

// Assuming the imports and PageState enum are correctly set as before

// You already have a store reflecting the loading state,
// so no need to use 'restore' here, you can directly use '$isLoading'
const $isLoading = searchDeliveriesByQueryFx.pending;

// Assuming $searchQuery and searchDeliveriesByQueryFx.doneData are setup correctly

// Restoration of fetch results to manage its state, resetting on new fetch attempts
const $fetchResults = restore(searchDeliveriesByQueryFx.doneData, null).reset(
    searchDeliveriesByQueryFx,
);

// Combining states to derive $searchState using PageState
const $searchState = combine(
    $searchQuery,
    $isLoading,
    $fetchResults,
    (searchQuery, isLoading, fetchResults): SearchPageState => {
        if (isLoading) return PageState.Loading;
        if (isEmpty(searchQuery)) return PageState.EmptyQuery;
        if (fetchResults === null) return PageState.EmptyQuery; // or another appropriate default state
        if (fetchResults.length === 0) return PageState.NotFound;
        return PageState.Search;
    },
);

// React to fetch failure separately
const $isFetchError = createStore<boolean>(false)
    .on(searchDeliveriesByQueryFx.fail, () => true)
    .reset(searchDeliveriesByQueryFx); // Resets on new fetch attempts

// Optionally combine with error state
export const $finalSearchState = combine(
    $searchState,
    $isFetchError,
    (pageState, isFetchError) => {
        return isFetchError ? PageState.Error : pageState;
    },
);

/**
 * Search results
 */
export const $searchResults = createStore<Delivery[]>([]).on(
    searchDeliveriesByQueryFx.doneData,
    (_, payload) => payload,
);
