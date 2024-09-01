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
import { networkModel } from '@/entities/viewer';

/**
 * Externals
 */
const {$$isOnline} = networkModel

/**
 * Events
 */
export const init = createEvent();
export const queryChanged = createEvent<string>();
export const queryAddedToHistory = createEvent<string>();
export const queryItemRemoved = createEvent<string>();
export const searchTriggerClicked = createEvent();
export const searchCloseArrowClicked = createEvent();
export const searchButtonClicked = createEvent();
export const searchPopupCloseClicked = createEvent();



/**
 * Initialization
 */

export const $isInitialized = createStore<boolean>(false).on(
  FetchUserSearchQueriesHistory.model.queryFetched,
    () => true,
);

sample({
    clock: delay(init, 300),
    source: $$isOnline,
    filter: (isOnline) => isOnline,
    target: FetchUserSearchQueriesHistory.model.fetch,
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
