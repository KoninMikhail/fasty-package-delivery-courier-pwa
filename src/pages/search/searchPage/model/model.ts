import { createEvent, sample } from 'effector';
import { sessionModel } from '@/entities/viewer';
import { widgetSearchResultsModel } from '@/widgets/search/searchResults';
import { createGate } from 'effector-react';

export const SearchPageGate = createGate();

/**
 * Events
 */
export const queryChanged = createEvent<string>();

/**
 * Network state
 */

const { $$isOnline, $isAuthorized } = sessionModel;

/**
 * Query
 */
sample({
    clock: queryChanged,
    target: widgetSearchResultsModel.queryChanged,
});

/**
 * Network state
 */
sample({
    clock: $$isOnline,
    source: $isAuthorized,
    filter: (isAuthorized) => isAuthorized,
    fn: (_, networkState) => networkState,
    target: widgetSearchResultsModel.setOnline,
});

sample({
    clock: SearchPageGate.open,
    target: widgetSearchResultsModel.init,
});
