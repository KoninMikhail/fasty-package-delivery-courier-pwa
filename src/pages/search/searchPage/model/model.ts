import { createEvent, sample } from 'effector';
import { sessionModel } from '@/entities/viewer';
import { widgetSearchResultsModel } from '@/widgets/search/searchResults';
import { createGate } from 'effector-react';
import { and, delay, not } from 'patronum';

export const SearchPageGate = createGate<{
    query: string;
}>();

const $isFirstLoadPage = not(widgetSearchResultsModel.$isInitialized);

/**
 * Events
 */
export const queryChanged = createEvent<string>();

/**
 * Network state
 */

const { $$isOnline, $isAuthorized } = sessionModel;

/**
 * Init
 */

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
    clock: delay(SearchPageGate.open, 500),
    source: and($isFirstLoadPage, $$isOnline, $isAuthorized),
    filter: (allowed) => allowed,
    target: widgetSearchResultsModel.init,
});

sample({
    clock: delay(SearchPageGate.open, 500),
    source: and($isFirstLoadPage, not($$isOnline), $isAuthorized),
    filter: (isFirstLoadPage) => isFirstLoadPage,
    target: widgetSearchResultsModel.initOffline,
});

sample({
    clock: widgetSearchResultsModel.$isInitialized,
    source: SearchPageGate.state,
    filter: (_, isInitialized) => isInitialized,
    fn: (state) => state.query,
    target: widgetSearchResultsModel.queryChanged,
});

sample({
    clock: SearchPageGate.state,
    fn: (state) => state.query,
    target: queryChanged,
});
