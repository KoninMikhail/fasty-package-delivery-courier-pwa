import { combine, createEvent, createStore, sample } from 'effector';
import { AssignDeliveryWithMe } from '@/features/delivery/assignDeliveryToUser';
import { assignUserToDeliveryFx } from '@/entities/user';
import { FetchDeliveriesByParameters } from '@/features/delivery/fetchDeliveriesByParams';
import { InfiniteScroll } from '@/features/other/infinite-scroll';
import { isEmpty } from '@/shared/lib/type-guards';
import { debounce, debug, delay } from 'patronum';
import { FetchDeliveryById } from '@/features/delivery/fetchDeliveryById';
import { fetchAvailableDeliveriesFx } from './effects';
import {
    $datesRange,
    $deliveryType,
    $express,
    $outputDeliveriesStore,
    $weight,
    clearDeliveries,
    datesRangePicked,
    deliveryTypeChanged,
    expressChanged,
    filtersChanged,
    setDeliveries,
    weightRangeChanged,
} from './stores';

/**
 * Events
 */

export const init = createEvent();
export const initOffline = createEvent();
export const fetchData = createEvent();
export const deliveryAssignCompleted = createEvent();
export const setOnline = createEvent<boolean>();

/**
 * Network
 */
export const $isOnline = createStore<boolean>(true)
    .on(initOffline, () => false)
    .on(setOnline, (_, payload) => payload)
    .reset(init);

/**
 * Fetching
 */

export const InfiniteScrollModel = InfiniteScroll.factory.createModel({
    provider: fetchAvailableDeliveriesFx,
    throttleTimeoutInMs: 500,
    initial: {
        page: 1,
        limit: 10,
    },
    onTriggerNewPage: (payload) => ({
        page: payload.page + 1,
        limit: payload.limit,
    }),
});

export const fetchDeliveriesModel =
    FetchDeliveriesByParameters.factory.createModel({
        provider: fetchAvailableDeliveriesFx,
        pagination: InfiniteScrollModel.$pagination,
        sourceData: combine(
            $express,
            $deliveryType,
            $weight,
            $datesRange,
            (express, type, weight, dates) => ({
                express,
                type: [...type][0],
                weight,
                fromDate: dates?.dateFrom,
                toDate: dates?.toDate,
            }),
        ),
    });

sample({
    clock: fetchDeliveriesModel.deliveriesFetched,
    source: {
        pagination: InfiniteScrollModel.$pagination,
        outputStore: $outputDeliveriesStore,
    },
    fn: ({ pagination, outputStore }, data) => {
        if (pagination.page === 1) return data;
        return [...outputStore, ...data];
    },
    target: setDeliveries,
});

sample({
    clock: InfiniteScrollModel.newPageRequested,
    target: fetchDeliveriesModel.fetch,
});

sample({
    clock: $isOnline,
    filter: (isOnline) => !isOnline,
    target: InfiniteScrollModel.reset,
});

/**
 * Assign delivery with current user
 */
export const assignDeliveryToUserModel =
    AssignDeliveryWithMe.factory.createModel({
        assignToDeliveryFx: assignUserToDeliveryFx,
    });

sample({
    clock: assignDeliveryToUserModel.assignCompleted,
    target: deliveryAssignCompleted,
});

// fetch for available offline
sample({
    clock: assignDeliveryToUserModel.assignCompleted,
    target: FetchDeliveryById.fetch,
});

/**
 * Widget initialization
 */
const initComplete = createEvent();
const $firstDataFetched = createStore<boolean>(false);

export const $isInitialized = createStore<boolean>(false)
    .on(initComplete, () => true)
    .reset(init);

// Online
sample({
    clock: delay(init, 400),
    source: $isInitialized,
    filter: (initialized) => !initialized,
    target: fetchDeliveriesModel.fetch,
});

sample({
    clock: fetchDeliveriesModel.deliveriesFetched,
    source: $isInitialized,
    filter: (initialized) => !initialized,
    fn: (_, deliveries) => deliveries,
    target: setDeliveries,
});

sample({
    clock: delay($outputDeliveriesStore, 100),
    source: $isInitialized,
    filter: (initialized) => !initialized,
    fn: () => true,
    target: $firstDataFetched,
});

sample({
    clock: $firstDataFetched,
    target: initComplete,
});

// Offline
sample({
    clock: delay(initOffline, 400),
    source: $isInitialized,
    filter: (initialized) => !initialized,
    target: [setOnline.prepend(() => false), initComplete],
});

debug({
    init,
    initOffline,
});

/**
 * Re-fetch Data
 */

sample({
    clock: fetchData,
    source: {
        isInit: $isInitialized,
        isOnline: $isOnline,
    },
    filter: ({ isInit, isOnline }) => isInit && isOnline,
    target: fetchDeliveriesModel.fetch,
});

/**
 * Change Filters
 */

sample({
    clock: [
        datesRangePicked,
        expressChanged,
        deliveryTypeChanged,
        weightRangeChanged,
    ],
    target: filtersChanged,
});

sample({
    clock: debounce(filtersChanged, 1000),
    target: [InfiniteScrollModel.reset, clearDeliveries],
});

sample({
    clock: delay(filtersChanged, 500),
    source: {
        isInit: $isInitialized,
        isOnline: $isOnline,
    },
    filter: ({ isInit, isOnline }) => isInit && isOnline,
    target: fetchDeliveriesModel.fetch,
});

/**
 * Handle states
 */

export const $hasNoDeliveries = createStore<boolean>(false)
    .on(fetchDeliveriesModel.deliveriesFetched, (_, deliveries) =>
        isEmpty(deliveries),
    )
    .on(fetchDeliveriesModel.deliveriesFetchFailed, () => true);

export const $isDeliveriesLoading = fetchDeliveriesModel.$pending;
export const $isFirstPage = InfiniteScrollModel.$pagination.map(
    (page) => page.page === 1,
);

/**
 * ------------------------------------------------
 * Erorrs
 */

export const $errors = combine(
    fetchDeliveriesModel.$errors,
    (fetchDeliveriesByParametersErrors) => {
        return [...fetchDeliveriesByParametersErrors];
    },
);
