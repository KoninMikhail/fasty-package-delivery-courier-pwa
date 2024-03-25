import { createGate } from 'effector-react';
import { createEvent, sample } from 'effector';
import { widgetSearchResultsModel } from '@/widgets/search/searchResults';
import { debug } from 'patronum';

export const SearchPageGateway = createGate<{ query: string }>();
export const setQueryEvent = createEvent<{
    query: string;
}>();

sample({
    clock: [SearchPageGateway.open, setQueryEvent],
    filter: (state) => state.query.length > 0,
    fn: (state) => state.query,
    target: widgetSearchResultsModel.setSearchQuery,
});

debug(SearchPageGateway.open);
