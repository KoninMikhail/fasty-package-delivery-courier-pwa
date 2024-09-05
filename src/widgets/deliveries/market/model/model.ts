import { combine, createEvent, createStore, sample } from 'effector';
import { AssignDeliveryWithMe } from '@/features/delivery/assignDeliveryToUser';
import { assignUserToDeliveryFx } from '@/entities/user';
import { FetchDeliveriesByParameters } from '@/features/delivery/fetchDeliveriesByParams';
import { InfiniteScroll } from '@/features/other/infinite-scroll';
import { isEmpty, isUnAuthorizedError } from '@/shared/lib/type-guards';
import { and, debounce, delay, not } from 'patronum';
import { RefreshToken } from '@/features/auth/refreshToken';
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
    resetFilters,
    setDeliveries,
    weightRangeChanged,
} from './stores';

/**
 * Events
 */

export const init = createEvent();
export const initOffline = createEvent();
export const setOffline = createEvent<boolean>();
export const fetchData = createEvent();
export const deliveryAssignCompleted = createEvent();
export const reset = createEvent();

/**
 * Network state
 */

export const $isOffline = createStore<Optional<boolean>>(null)
    .on(initOffline, () => true)
    .on(setOffline, (_, payload) => payload)
    .reset(reset);

/**
 * Data Fetching
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
    source: and(not($isInitialized), not($isOffline)),
    filter: (allowed) => !!allowed,
    target: fetchDeliveriesModel.fetch,
});

sample({
    clock: fetchDeliveriesModel.deliveriesFetched,
    source: and(not($isInitialized), not($isOffline)),
    filter: (allowed) => !!allowed,
    fn: (_, deliveries) => deliveries,
    target: setDeliveries,
});

sample({
    clock: delay($outputDeliveriesStore, 100),
    source: and(not($isInitialized), not($isOffline)),
    filter: (allowed) => !!allowed,
    fn: () => true,
    target: $firstDataFetched,
});

sample({
    clock: $firstDataFetched,
    target: initComplete,
});

/**
 * Fetch Data
 */

sample({
    clock: fetchData,
    source: and($isInitialized, not($isOffline)),
    filter: (allowed) => allowed,
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
    source: and($isInitialized, not($isOffline)),
    filter: (allowed) => allowed,
    target: fetchDeliveriesModel.fetch,
});

/**
 * States
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
 * Change network state
 */

sample({
    clock: $isOffline,
    source: $isInitialized,
    filter: (isInit, isOnline) => isInit && isOnline === false,
    fn: (isOnline) => !isOnline,
    target: [fetchDeliveriesModel.reset, clearDeliveries],
});

sample({
    clock: delay($isOffline, 300),
    source: $isInitialized,
    filter: (isInit, isOnline) => isInit && isOnline === false,
    fn: (isOnline) => !isOnline,
    target: fetchDeliveriesModel.fetch,
});

/**
 * Refresh token on error
 */

sample({
    clock: fetchDeliveriesModel.deliveriesFetchFailed,
    filter: (error) => isUnAuthorizedError(error),
    target: RefreshToken.tokenRefreshRequested,
});

sample({
    clock: RefreshToken.updateTokenSuccess,
    source: fetchDeliveriesModel.$errors,
    filter: (errors) => !isEmpty(errors),
    target: fetchDeliveriesModel.fetch,
});

sample({
    clock: RefreshToken.updateTokenSuccess,
    source: $isInitialized,
    filter: (isInit) => !isInit,
    target: fetchDeliveriesModel.fetch,
});

/**
 * Reset
 */
sample({
    clock: delay(reset, 300),
    source: $isInitialized,
    filter: (isInit) => isInit,
    target: [clearDeliveries, resetFilters],
});
