import { createEvent, createStore } from 'effector';
import { debounce } from 'patronum';
import { persist } from 'effector-storage/local';
import { sharedLibHelpers } from '@/shared/lib';
import { MAX_RECENT_REQUESTS, RECENT_QUERIES_KEY } from '../config';

const { clearPaddedCharacters } = sharedLibHelpers;

export const clickTriggerElement = createEvent();
export const clickCloseArrow = createEvent();
export const clickSearchButton = createEvent();
export const clickDeleteRecentRequest = createEvent<string>();

/**
 * Popup state
 */

export const $isOpened = createStore<boolean>(false)
    .on(clickTriggerElement, () => true)
    .on(clickCloseArrow, () => false)
    .reset(clickSearchButton);

/**
 * Search query events
 */

export const changeSearchQuery = createEvent<string>();
export const $searchQuery = createStore<string>('')
    .on(changeSearchQuery, (_, query) => query)
    .reset(clickTriggerElement);
/**
 * Search query history
 */
export const DEBOUNCE_TIMEOUT = 500;

export const addSearchRequest = createEvent<string>();
export const addSearchRequestDebounced = debounce({
    source: addSearchRequest,
    timeout: DEBOUNCE_TIMEOUT,
});

export const $historyRequestsStore = createStore<string[]>([])
    .on(addSearchRequestDebounced, (state, query) => {
        if (query) {
            if (state.includes(query)) {
                return [query, ...state.filter((item) => item !== query)];
            }
            if (state.length <= MAX_RECENT_REQUESTS && !state.includes(query)) {
                return [query, ...state];
            }
            return [query, ...state.slice(0, MAX_RECENT_REQUESTS)];
        }
        return state;
    })
    .on(clickDeleteRecentRequest, (state, query) => {
        return state.filter((item) => item !== query);
    });

/**
 * Local storage
 */
persist({
    store: $historyRequestsStore,
    key: RECENT_QUERIES_KEY,
});
