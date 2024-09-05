import { createEvent, createStore } from 'effector';

export const setQuery = createEvent<string>();
export const $searchQuery = createStore<string>('').on(
    setQuery,
    (_, query) => query,
);
