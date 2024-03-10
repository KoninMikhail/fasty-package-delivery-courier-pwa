import { createGate } from 'effector-react';
import { sample } from 'effector';
import { widgetSearchResultsModel } from '@/widgets/search/searchResults';

export const SearchPageGateway = createGate<{ query: string }>();

sample({
    clock: SearchPageGateway.open,
    filter: (state) => state.query.length > 0,
    fn: (state) => state.query,
    target: widgetSearchResultsModel.setSearchQuery,
});
