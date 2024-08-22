import { createEvent, createStore, sample } from 'effector';
import { InfiniteScroll } from 'features/other/infinite-scroll';
import { FetchDeliveriesByParameters } from '@/features/delivery/fetchDeliveriesByParams';
import { and, condition, delay } from 'patronum';
import { sessionModel } from '@/entities/viewer';
import { $fetchedData, setDeliveriesHistory } from './stores';
import { getDeliveriesHistoryFx } from './effects';

/**
 * Events
 */
export const init = createEvent();
export const initOffline = createEvent();
export const setOnline = createEvent<boolean>();
export const fetchData = createEvent();

/**
 * Network status
 */

const $isOnline = createStore(false)
    .on(initOffline, () => false)
    .on(setOnline, (_, isOnline) => isOnline)
    .reset(init);

/**
 * Features
 */
export const InfiniteScrollModel = InfiniteScroll.factory.createModel({
    provider: getDeliveriesHistoryFx,
    throttleTimeoutInMs: 500,
    initial: {
        page: 1,
    },
    onTriggerNewPage: (query) => {
        return {
            page: query.page + 1,
        };
    },
    shouldLoadNextPage: (data) => data.length > 0,
});

const fetchDeliveriesHistoryModel =
    FetchDeliveriesByParameters.factory.createModel({
        provider: getDeliveriesHistoryFx,
        pagination: InfiniteScrollModel.$pagination,
    });

sample({
    clock: fetchDeliveriesHistoryModel.deliveriesFetched,
    source: $fetchedData,
    fn: (previous, next) => [...previous, ...next],
    target: setDeliveriesHistory,
});

sample({
    clock: delay(InfiniteScrollModel.newPageRequested, 300),
    target: fetchDeliveriesHistoryModel.fetch,
});

/**
 * Initialize the model
 */
const initStarted = createEvent();
const initCompleted = createEvent();

export const $isInitialized = createStore(false).on(initCompleted, () => true);

condition({
    source: init,
    if: and(sessionModel.$isAuthorized, sessionModel.$$isOnline),
    then: initStarted,
    else: initCompleted,
});

// Online
sample({
    clock: initStarted,
    target: fetchDeliveriesHistoryModel.fetch,
});

sample({
    clock: delay(fetchDeliveriesHistoryModel.deliveriesFetched, 200),
    source: $isInitialized,
    filter: (initialized) => !initialized,
    target: initCompleted,
});

// Offline
sample({
    clock: initOffline,
    target: initCompleted,
});

export const { $errors } = fetchDeliveriesHistoryModel;
