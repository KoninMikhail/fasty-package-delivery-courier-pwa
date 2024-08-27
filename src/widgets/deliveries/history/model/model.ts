import { createEvent, createStore, sample } from 'effector';
import { InfiniteScroll } from 'features/other/infinite-scroll';
import { FetchDeliveriesByParameters } from '@/features/delivery/fetchDeliveriesByParams';
import { debug, delay } from 'patronum';
import { $fetchedData, setDeliveriesHistory } from './stores';
import { getDeliveriesHistoryFx } from './effects';

/**
 * Events
 */
export const init = createEvent();
export const initOffline = createEvent();
export const setOnline = createEvent<boolean>();
export const fetchData = createEvent();
export const reset = createEvent();

/**
 * Network status
 */

export const $isOnline = createStore(true)
    .on(initOffline, () => false)
    .on(setOnline, (_, isOnline) => isOnline)
    .on(init, () => true)
    .reset(reset);

/**
 * Data fetching
 */

export const infiniteScrollModel = InfiniteScroll.factory.createModel({
    provider: getDeliveriesHistoryFx,
    throttleTimeoutInMs: 500,
    initial: {
        page: 1,
    },
    onTriggerNewPage: (query) => ({
        page: query.page + 1,
    }),
});

const fetchDeliveriesHistoryModel =
    FetchDeliveriesByParameters.factory.createModel({
        provider: getDeliveriesHistoryFx,
        pagination: infiniteScrollModel.$pagination,
    });

sample({
    clock: fetchDeliveriesHistoryModel.deliveriesFetched,
    source: $fetchedData,
    fn: (previous, next) => [...previous, ...next],
    target: setDeliveriesHistory,
});

sample({
    clock: delay(infiniteScrollModel.newPageRequested, 300),
    target: fetchDeliveriesHistoryModel.fetch,
});

debug({
    pagination: infiniteScrollModel.$pagination,
});

/**
 * Initialize the model
 */
const initCompleted = createEvent();

export const $isInitialized = createStore(false)
    .on(initCompleted, () => true)
    .reset(reset);

// Online
sample({
    clock: init,
    target: infiniteScrollModel.reset,
});

sample({
    clock: delay(init, 300),
    target: fetchDeliveriesHistoryModel.fetch,
});

sample({
    clock: delay(fetchDeliveriesHistoryModel.deliveriesFetched, 500),
    source: $isInitialized,
    filter: (initialized) => !initialized,
    target: initCompleted,
});

// Offline
sample({
    clock: initOffline,
    target: [initCompleted, setOnline.prepend(() => false)],
});

export const { $errors } = fetchDeliveriesHistoryModel;
