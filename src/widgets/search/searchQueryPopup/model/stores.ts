import { createEvent, createStore } from 'effector';
import { persist } from 'effector-storage/local';
import { RECENT_QUERIES_KEY } from '../config';

/**
 * Query state
 */
export const setQuery = createEvent<string>();
export const $query = createStore<string>('').on(setQuery, (_, query) => query);

/**
 * Related queries
 */
export const setRelatedQueries = createEvent<string[]>();
export const addRelatedQuery = createEvent<string>();
export const removeRelatedQuery = createEvent<string>();

export const $relatedQueries = createStore<string[]>([])
    .on(setRelatedQueries, (_, queries) => queries)
    .on(addRelatedQuery, (state, query) => {
        if (state.includes(query)) {
            const historyWithoutQuery = state.filter((item) => item !== query);
            return [query, ...historyWithoutQuery];
        }
        return [query, ...state];
    })
    .on(removeRelatedQuery, (state, query) =>
        state.filter((item) => item !== query),
    );

persist({ store: $relatedQueries, key: RECENT_QUERIES_KEY });

/**
 * Popup state
 */

export const setPopupOpened = createEvent<boolean>();
export const openPopup = setPopupOpened.prepend(() => true);
export const closePopup = setPopupOpened.prepend(() => false);
export const $isPopupOpened = createStore<boolean>(false).on(
    setPopupOpened,
    (_, isOpened) => isOpened,
);
