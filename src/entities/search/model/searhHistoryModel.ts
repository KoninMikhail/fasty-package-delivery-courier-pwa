import { createEvent, createStore } from 'effector';
import { persist } from 'effector-storage/local';
import { SearchQueryHistoryItem } from '../types';

/**
 * Search query history
 */

export const addQueryToHistory = createEvent<SearchQueryHistoryItem>();
export const removeQueryFromHistory = createEvent<SearchQueryHistoryItem>();
export const $queryHistory = createStore<SearchQueryHistoryItem[]>([])
    .on(addQueryToHistory, (store, payload) => {
        const isExist = store.some((item) => item.query === payload.query);
        if (isExist) {
            if (store[0].query === payload.query) {
                return store;
            }
            return [
                payload,
                ...store.filter((item) => item.query !== payload.query),
            ];
        }
        return [payload, ...store];
    })
    .on(removeQueryFromHistory, (store, payload) =>
        store.filter((item) => item.query !== payload.query),
    );

persist({ store: $queryHistory, key: 'queryHistory' });
