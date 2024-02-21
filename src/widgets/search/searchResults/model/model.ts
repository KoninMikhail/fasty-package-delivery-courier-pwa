import { createEvent, createStore, sample } from 'effector';
import { searchEffects } from '@/entities/search/';
import { Delivery } from '@/shared/api';

export const setSearchQuery = createEvent();

export const searchQuery = createStore<string>('').on(
    setSearchQuery,
    (_, query) => query,
);

const setSearchResults = createEvent<Delivery[]>();
export const $searchResults = createStore<string[]>([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
]);

sample({
    clock: searchEffects.getSearchResults.doneData,
    target: setSearchResults,
});
