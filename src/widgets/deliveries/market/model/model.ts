import { createEvent, createStore, sample } from 'effector';
import { AssignDeliveryToUser } from '@/features/delivery/assignDeliveryToUser';
import { sessionModel } from '@/entities/viewer';
import { assignUserToDeliveryFx } from '@/entities/user';
import { sharedLibTypeGuards } from '@/shared/lib';
import { fetchAvailableDeliveriesFx } from '@/entities/delivery';
import { FetchDeliveriesByParameters } from '@/features/delivery/fetchDeliveriesByParams';
import { InfiniteScroll } from '@/features/other/infinite-scroll';
import { Delivery } from '@/shared/api';

const { isEmpty } = sharedLibTypeGuards;

/**
 * Events
 */
export const init = createEvent(); // full reset of the market
export const fetchData = createEvent(); // refetch data

/**
 * Providers
 */
export const fetchDeliveriesModel =
    FetchDeliveriesByParameters.factory.createModel({
        fetchDeliveriesFx: fetchAvailableDeliveriesFx,
    });

/**
 * Infinite scroll
 */
export const InfiniteScrollModel = InfiniteScroll.factory.createModel({
    provider: fetchAvailableDeliveriesFx,
    initialPagination: {
        page: 0,
    },
    paginationOnLoadNewPage: (payload) => ({
        page: payload.page + 1,
    }),
    stopOn: (payload) => isEmpty(payload),
});

/**
 * Actions
 */
export const assignDeliveryToUserModel =
    AssignDeliveryToUser.factory.createModel({
        assignToDeliveryFx: assignUserToDeliveryFx,
    });

/**
 * State
 */

/**
 * Handlers
 */
sample({
    clock: [init, fetchData],
    source: sessionModel.$$isOnline,
    filter: (isOnline) => isOnline,
    fn: () => {},
    target: fetchDeliveriesModel.fetch,
});

sample({
    clock: InfiniteScrollModel.newPageRequested,
    fn: ({ page }) => page,
    target: fetchDeliveriesModel.pageChanged,
});

/**
 * Exports
 */
export const $outputStore = createStore<Delivery[]>([])
    .on(fetchDeliveriesModel.$fetchedDeliveries, (state, payload) => {
        return [...state, ...(payload as Delivery)];
    })
    .reset(init);
