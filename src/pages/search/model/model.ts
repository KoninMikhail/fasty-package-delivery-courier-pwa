import { createEvent, createStore, sample } from 'effector';
import { widgetSearchResultsModel } from '@/widgets/search/searchResults';
import { createGate } from 'effector-react';
import { and, delay, not } from 'patronum';
import { DetectNetworkConnectionState } from '@/features/device/detectNetworkConnectionState';
import { widgetNavbarDesktopModel } from '@/widgets/layout/navbar-desktop';
import { widgetNavbarMobileModel } from '@/widgets/layout/navbar-mobile';
import { TIMEOUT_BEFORE_INIT_WIDGETS } from '@/pages/deliveries/marketPage/config';
import { Logout } from '@/features/auth/logout';
import { widgetSearchQueryPopupModel } from '@/widgets/search/searchQueryPopup';

export const {
    model: { $$isOnline },
} = DetectNetworkConnectionState;

export const SearchPageGate = createGate<{
    query: string;
}>();

const $isPageVisible = SearchPageGate.status;
const $isFirstPageLoad = createStore<boolean>(false)
    .on(SearchPageGate.open, () => true)
    .reset(Logout.model.userLoggedOut);

/**
 * Events
 */
export const queryChanged = createEvent<string>();

/**
 * Init
 */

// Search query popup
sample({
    clock: delay(SearchPageGate.open, TIMEOUT_BEFORE_INIT_WIDGETS),
    source: and(
        $isFirstPageLoad,
        $isPageVisible,
        $$isOnline,
        not(widgetSearchQueryPopupModel.$isInitialized),
    ),
    filter: (isAllow) => isAllow,
    target: widgetSearchQueryPopupModel.init,
});

sample({
    clock: delay(SearchPageGate.open, TIMEOUT_BEFORE_INIT_WIDGETS),
    source: and(
        $isFirstPageLoad,
        $isPageVisible,
        not($$isOnline),
        not(widgetSearchQueryPopupModel.$isInitialized),
    ),
    filter: (isAllow) => isAllow,
    target: widgetSearchQueryPopupModel.initOffline,
});

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
