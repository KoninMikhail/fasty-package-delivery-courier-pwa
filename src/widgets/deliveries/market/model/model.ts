import { combine, createEvent, createStore, sample } from 'effector';
import { AssignDeliveryWithMe } from '@/features/delivery/assignDeliveryToUser';
import { assignUserToDeliveryFx } from '@/entities/user';
import { fetchAvailableDeliveriesFx } from '@/entities/delivery';
import { FetchDeliveriesByParameters } from '@/features/delivery/fetchDeliveriesByParams';
import { InfiniteScroll } from '@/features/other/infinite-scroll';
import { isEmpty } from '@/shared/lib/type-guards';
import { condition, delay } from "patronum";
import {
  $datesRange,
  $deliveryType,
  $express,
  $outputDeliveriesStore, $weight, clearDeliveries,
  datesRangePicked,
  deliveryTypeChanged,
  expressChanged, filtersChanged,
  setDeliveries,
  weightRangeSelected
} from "./stores";
import { sessionModel } from '@/entities/viewer';

/**
 * Events
 */

export const init = createEvent();
export const fetchData = createEvent();


/**
 * Fetching
 */

export const InfiniteScrollModel = InfiniteScroll.factory.createModel({
    provider: fetchAvailableDeliveriesFx,
    throttleTimeoutInMs: 500,
    initial: {
        page: 1,
        limit: 50,
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

/**
 * Assign delivery with current user
 */
export const assignDeliveryToUserModel =
    AssignDeliveryWithMe.factory.createModel({
        assignToDeliveryFx: assignUserToDeliveryFx,
    });

/**
 * Widget initialization
 */
const initStarted = createEvent()
const initComplete = createEvent()
const $firstDataFetched = createStore<boolean>(false)

export const $isInitialized = createStore<boolean>(false).on(initComplete, () => true)
  .reset(init);

sample({
  clock: delay(init, 400),
  source: $isInitialized,
  filter: (initialized) => !initialized,
  target: fetchDeliveriesModel.fetch,
});

condition({
  source: initStarted,
  if: sessionModel.$$isOnline,
  then: fetchDeliveriesModel.fetch,
  else: initComplete
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
})

sample({
  clock: $firstDataFetched,
  target: initComplete,
})

/**
 * Re-fetch Data
 */

sample({
  clock: fetchData,
  source:{
    isInit: $isInitialized,
    isOnline: sessionModel.$$isOnline,
    isAuthorized: sessionModel.$isAuthorized,
  },
  filter: ({ isInit, isOnline, isAuthorized }) => isInit && isOnline && isAuthorized,
  target: fetchDeliveriesModel.fetch,
})

/**
 * Change Filters
 */

sample({
  clock: [
    datesRangePicked,
    expressChanged,
    deliveryTypeChanged,
    weightRangeSelected,
  ],
  target: filtersChanged,
});

sample({
  clock: filtersChanged,
  target: [InfiniteScrollModel.reset,  clearDeliveries],
});

sample({
  clock: delay(filtersChanged, 500),
  source:{
    isInit: $isInitialized,
    isOnline: sessionModel.$$isOnline,
    isAuthorized: sessionModel.$isAuthorized,
  },
  filter: ({ isInit, isOnline, isAuthorized }) => isInit && isOnline && isAuthorized,
  target: fetchDeliveriesModel.fetch,
});


/**
 * Handle states
 */

export const $hasNoDeliveries = createStore<boolean>(false)
  .on(fetchDeliveriesModel.deliveriesFetched, (state, deliveries) => isEmpty(deliveries))
  .on(fetchDeliveriesModel.deliveriesFetchFailed, (state, deliveries) => true)
  .reset([fetchDeliveriesModel.deliveriesFetched]);

export const $isDeliveriesLoading = fetchDeliveriesModel.$pending;
export const $hasErrors = fetchDeliveriesModel.$$hasErrors;
