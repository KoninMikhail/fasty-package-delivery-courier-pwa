import { createEvent, createStore } from 'effector';

export const setQuery = createEvent<string>();
export const queryReset = createStore<string>('');
export const $query = createStore<string>('').on(setQuery, (_, query) => query);
