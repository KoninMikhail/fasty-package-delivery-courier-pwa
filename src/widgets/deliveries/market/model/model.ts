import { combine, createEvent, createStore, sample } from 'effector';
import { AssignDeliveryWithMe } from '@/features/delivery/assignDeliveryToUser';
import { assignUserToDeliveryFx } from '@/entities/user';
import { FetchDeliveriesByParameters } from '@/features/delivery/fetchDeliveriesByParams';
import { InfiniteScroll } from '@/features/other/infinite-scroll';
import { isEmpty, isUnAuthorizedError } from '@/shared/lib/type-guards';
import { and, delay, not, throttle } from 'patronum';
import { RefreshToken } from '@/features/auth/refreshToken';
import { DatePeriod } from '@/shared/ui/components/forms/horizontal-date-picker/types';
import { DeliveryType } from '@/shared/api';
import { fetchAvailableDeliveriesFx } from './effects';
import {
    $datesRange,
    $deliveryType,
    $express,
    $outputDeliveriesStore,
    $weight,
    clearDeliveries,
    setDatesRange,
    setDeliveries,
    setDeliveryType,
    setExpress,
    setWeight,
} from './stores';

/**
 * Events
 */

export const init = createEvent();
export const initOffline = createEvent();
export const setOffline = createEvent<boolean>();
export const fetchData = createEvent();
export const datesRangePicked = createEvent<DatePeriod>();
export const expressChanged = createEvent<boolean>();
export const deliveryTypeChanged = createEvent<DeliveryType>();
export const weightRangeChanged = createEvent<[number, number]>();
export const resetFilters = createEvent();
export const deliveryAssignCompleted = createEvent();
export const reset = createEvent();

/**
 * Network state
 */

export const $isOffline = createStore<Optional<boolean>>(null)
    .on(initOffline, () => true)
    .on(setOffline, (_, payload) => payload)
    .reset([reset, init]);

/**
 * Data Fetching
 */
export const infiniteScrollModel = InfiniteScroll.factory.createModel({
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
        pagination: infiniteScrollModel.$pagination,
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

export const $hasNoDeliveries = createStore<boolean>(false).on(
    fetchDeliveriesModel.deliveriesFetchFailed,
    () => true,
);

sample({
    clock: fetchDeliveriesModel.deliveriesFetched,
    source: infiniteScrollModel.$pagination,
    filter: (pagination) => pagination.page === 1,
    fn: (_, data) => {
        return isEmpty(data);
    },
    target: $hasNoDeliveries,
});

export const $isDeliveriesLoading = fetchDeliveriesModel.$pending;
export const $isFirstPage = infiniteScrollModel.$pagination.map(
    (page) => page.page === 1,
);

sample({
    clock: fetchDeliveriesModel.deliveriesFetched,
    source: {
        pagination: infiniteScrollModel.$pagination,
        outputStore: $outputDeliveriesStore,
    },
    fn: ({ pagination, outputStore }, data) => {
        if (pagination.page === 1) return data;
        if (isEmpty(data) && pagination.page > 1) return outputStore;
        return [...outputStore, ...data];
    },
    target: setDeliveries,
});

sample({
    clock: infiniteScrollModel.newPageRequested,
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
export const $isReadyForInfiniteScroll = createStore<boolean>(false);

export const $isInitialized = createStore<boolean>(false)
    .on(initComplete, () => true)
    .on(initOffline, () => true)
    .reset(init);

// Online
sample({
    clock: delay(init, 400),
    source: and(not($isInitialized), not($isOffline)),
    filter: (allowed) => !!allowed,
    target: fetchDeliveriesModel.fetch,
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

sample({
    clock: delay(fetchDeliveriesModel.deliveriesFetched, 300),
    source: $outputDeliveriesStore,
    filter: (deliveries) => !isEmpty(deliveries),
    fn: () => true,
    target: $isReadyForInfiniteScroll,
});

sample({
    clock: fetchDeliveriesModel.fetch,
    fn: () => false,
    target: $isReadyForInfiniteScroll,
});

/**
 * Filters
 */
sample({
    clock: expressChanged,
    target: [setExpress, infiniteScrollModel.reset],
});

sample({
    clock: deliveryTypeChanged,
    target: [setDeliveryType, infiniteScrollModel.reset],
});

sample({
    clock: weightRangeChanged,
    target: [setWeight, infiniteScrollModel.reset],
});

sample({
    clock: datesRangePicked,
    target: [setDatesRange, infiniteScrollModel.reset],
});

sample({
    clock: [
        throttle(expressChanged, 500),
        throttle(deliveryTypeChanged, 500),
        throttle(weightRangeChanged, 500),
        throttle(datesRangePicked, 500),
    ],
    source: and($isInitialized, not($isOffline)),
    filter: (allowed) => !!allowed,
    target: fetchDeliveriesModel.fetch,
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
