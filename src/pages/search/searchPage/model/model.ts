import { createEvent, sample } from 'effector';
import { widgetSearchResultsModel } from '@/widgets/search/searchResults';
import { createGate } from 'effector-react';
import { and, debug, delay, not } from 'patronum';
import { DetectNetworkConnectionState } from '@/features/device/detectNetworkConnectionState';
import { widgetNavbarDesktopModel } from '@/widgets/layout/navbar-desktop';
import { widgetNavbarMobileModel } from '@/widgets/layout/navbar-mobile';

export const {
    model: { $$isOnline },
} = DetectNetworkConnectionState;

export const SearchPageGate = createGate<{
    query: string;
}>();

/**
 * Events
 */
export const queryChanged = createEvent<string>();

/**
 * Query
 */
sample({
    clock: queryChanged,
    target: widgetSearchResultsModel.queryChanged,
});

/**
 * Init
 */

const $isFirstLoadPage = not(widgetSearchResultsModel.$isInitialized);

sample({
    clock: delay(SearchPageGate.open, 500),
    source: and($isFirstLoadPage, $$isOnline),
    filter: (allowed) => allowed,
    target: widgetSearchResultsModel.init,
});

sample({
    clock: delay(SearchPageGate.open, 500),
    source: and($isFirstLoadPage, not($$isOnline)),
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

/**
 * Set query for nav item
 */
sample({
    clock: queryChanged,
    target: [
        widgetNavbarDesktopModel.setQuery,
        widgetNavbarMobileModel.setQuery,
    ],
});

debug({
    queryChanged,
});

/**
 * Change network state
 */
sample({
    clock: $$isOnline,
    source: widgetSearchResultsModel.$isInitialized,
    filter: (isInit) => isInit,
    fn: (isOnline) => !isOnline,
    target: widgetSearchResultsModel.setOffline,
});
