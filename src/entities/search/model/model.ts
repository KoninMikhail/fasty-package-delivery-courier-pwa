import { createEvent, createStore } from 'effector';
import { persist } from 'effector-storage/local';
import { debounce } from 'patronum';
import {
    RECENT_REQUESTS_KEY,
    MAX_RECENT_REQUESTS,
    DEBOUNCE_TIMEOUT,
} from '../config';

/**
 * Events
 */
export const addSearchRequest = createEvent<string>();
export const addSearchRequestDebounced = debounce({
    source: addSearchRequest,
    timeout: DEBOUNCE_TIMEOUT,
});
export const removeSearchRequest = createEvent<string>();

/**
 * Store
 */
export const $historyRequestsStore = createStore<string[]>([])
    .on(addSearchRequestDebounced, (state, query) => {
        if (!query) return state;
        if (state.includes(query)) {
            return [query, ...state.filter((item) => item !== query)];
        }
        if (state.length <= MAX_RECENT_REQUESTS && !state.includes(query)) {
            return [query, ...state];
        }
        return [query, ...state.slice(0, MAX_RECENT_REQUESTS)];
    })
    .on(removeSearchRequest, (state, query) => {
        return state.filter((item) => item !== query);
    });

/**
 * Local storage
 */
persist({
    store: $historyRequestsStore,
    key: RECENT_REQUESTS_KEY,
});
