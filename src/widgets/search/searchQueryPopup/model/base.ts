import { createEvent, createStore } from 'effector';
import { debug } from 'patronum';

export const setQuery = createEvent<string>();
export const $query = createStore<string>('').on(setQuery, (_, query) => query);

debug($query);
