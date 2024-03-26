import { createGate } from 'effector-react';
import { createEvent, sample } from 'effector';
import { widgetSearchResultsModel } from '@/widgets/search/searchResults';
import { widgetSearchQueryPopupModel } from '@/widgets/search/searchQueryPopup';

export const SearchPageGateway = createGate<{ query: string }>();

sample({
    clock: SearchPageGateway.open,
    fn: (state) => state.query,
    target: widgetSearchResultsModel.setSearchQuery,
});

export const searchInputPressed = createEvent();

sample({
    clock: searchInputPressed,
    target: widgetSearchQueryPopupModel.clickTriggerElement,
});
