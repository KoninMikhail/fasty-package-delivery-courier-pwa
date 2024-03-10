import { createEvent, createStore } from 'effector';

/**
 * Query
 */
export const queryChanged = createEvent<string>();
export const queryCleared = createEvent();

export const $query = createStore<string>('')
    .on(queryChanged, (_, query) => query)
    .reset(queryCleared);
