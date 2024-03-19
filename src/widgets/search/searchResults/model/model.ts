import { createEvent, createStore, sample } from 'effector';
import {
    searchDeliveriesByQueryFx,
    searchHistoryModel,
} from '@/entities/search/';
import { Delivery } from '@/shared/api';
import { GetDeliveriesByQuery } from '@/features/search/getDeliveriesByQuery';
import { sessionModel } from '@/entities/viewer';
import { debug } from 'patronum';

export const setSearchQuery = createEvent<string>();

const searchDeliveryByQueryModel = GetDeliveriesByQuery.factory.createModel({
    debounceTime: 300,
    minQueryLength: 1,
    searchFx: searchDeliveriesByQueryFx,
});

debug(searchDeliveriesByQueryFx.doneData);

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
