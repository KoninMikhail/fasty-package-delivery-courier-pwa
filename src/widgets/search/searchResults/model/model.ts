import { createEvent, createStore, sample } from 'effector';
import {
    searchDeliveriesByQueryFx,
    searchHistoryModel,
} from '@/entities/search/';
import { Delivery } from '@/shared/api';
import { GetDeliveriesByQuery } from '@/features/search/getDeliveriesByQuery';
import { sessionModel } from '@/entities/viewer';

export const setSearchQuery = createEvent<string>();

export const searchDeliveryByQueryModel =
    GetDeliveriesByQuery.factory.createModel({
        debounceTime: 300,
        minQueryLength: 1,
        searchFx: searchDeliveriesByQueryFx,
    });
export const $$emptySearchQuery = searchDeliveryByQueryModel.$query.map(
    (query) => query === '' || query === null,
);
export const $$searchPending = searchDeliveryByQueryModel.$pending;

sample({
    clock: setSearchQuery,
    target: searchDeliveryByQueryModel.queryChanged,
});

sample({
    clock: setSearchQuery,
    source: sessionModel.$sessionStore,
    fn: (viewer, query) => {
        const userId = viewer?.id || 0;
        return {
            query,
            id: userId,
            timestamp: Date.now(),
        };
    },
    target: searchHistoryModel.addQueryToHistory,
});

export const $searchResults = createStore<Delivery[]>([]).on(
    searchDeliveryByQueryModel.$searchResults,
    (_, results) => results,
);
