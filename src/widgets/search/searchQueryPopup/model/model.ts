import { createEvent, createStore, sample } from 'effector';
import { FetchUserSearchQueriesHistory } from '@/features/search/fetchUserSearchQueriesHistory';
import { RemoveUserSearchQueryItem } from '@/features/search/removeUserSearchQueryItem';
import { delay } from 'patronum';
import {
    addRelatedQuery,
    closePopup,
    openPopup,
    removeRelatedQuery,
    setQuery,
    setRelatedQueries,
} from './stores';

/**
 * Events
 */
export const init = createEvent();
export const initOffline = createEvent();
export const setOnline = createEvent<boolean>();
export const queryChanged = createEvent<string>();
export const queryAddedToHistory = createEvent<string>();
export const queryItemRemoved = createEvent<string>();
export const searchTriggerClicked = createEvent();
export const searchCloseArrowClicked = createEvent();
export const searchButtonClicked = createEvent();
export const searchPopupCloseClicked = createEvent();

/**
 * Network
 */
export const $isOnline = createStore<boolean>(true)
    .on(setOnline, (_, payload) => payload)
    .on(initOffline, () => false)
    .reset(init);

/**
 * Initialization
 */
const initCompleted = createEvent();

export const $isInitialized = createStore<boolean>(false).on(
    initCompleted,
    () => true,
);

// Online
sample({
    clock: delay(init, 300),
    target: FetchUserSearchQueriesHistory.model.fetch,
});

sample({
    clock: init,
    target: FetchUserSearchQueriesHistory.model.fetch,
});

sample({
    clock: FetchUserSearchQueriesHistory.model.queryFetched,
    source: $isInitialized,
    filter: (isInitialized) => !isInitialized,
    target: initCompleted,
});

// Offline
sample({
    clock: delay(initOffline, 300),
    target: initCompleted,
});

/**
 * Related queries
 */

sample({
    clock: queryAddedToHistory,
    target: addRelatedQuery,
});

sample({
    clock: FetchUserSearchQueriesHistory.model.queryFetched,
    target: setRelatedQueries,
});

/**
 * Popup control
 */
sample({
    clock: searchTriggerClicked,
    target: openPopup,
});

sample({
    clock: [
        searchCloseArrowClicked,
        searchButtonClicked,
        searchPopupCloseClicked,
    ],
    target: closePopup,
});

/**
 * Change query
 */
sample({
    clock: queryChanged,
    target: setQuery,
});

/**
 * Remove search query item
 */
sample({
    clock: queryItemRemoved,
    target: RemoveUserSearchQueryItem.model.removeQueryItem,
});

sample({
    clock: RemoveUserSearchQueryItem.model.queryItemRemoved,
    target: removeRelatedQuery,
});

sample({
    clock: delay(removeRelatedQuery, 1000),
    target: FetchUserSearchQueriesHistory.model.fetch,
});
