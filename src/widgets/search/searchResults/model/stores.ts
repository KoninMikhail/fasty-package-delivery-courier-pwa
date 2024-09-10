import { Delivery } from '@/shared/api';
import { createEvent, createStore } from 'effector';

/**
 * Query store
 */

export const setQuery = createEvent<string>();
export const clearQuery = createEvent();
export const $searchQuery = createStore('')
    .on(setQuery, (_, query) => query)
    .reset(clearQuery);
/**
 * Search results
 */
export const setResults = createEvent<Delivery[]>();
export const clearResults = createEvent();

export const $searchResults = createStore<Delivery[]>([])
    .on(setResults, (_, results) => results)
    .reset(clearResults);
