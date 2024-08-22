import { Delivery } from '@/shared/api';
import { createEvent, createStore } from 'effector';

/**
 * Search results
 */
export const setResults = createEvent<Delivery[]>();
export const clearResults = createEvent();

export const $searchResults = createStore<Delivery[]>([])
    .on(setResults, (_, results) => results)
    .reset(clearResults);
