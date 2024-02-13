import {createEffect, createStore} from 'effector';
import {couriersApi} from "@/shared/api";

export const getMyDeliveriesFx = createEffect(async () => {
    return couriersApi.fetchUpcomingDeliveries();
}

export const $myDeliveries = createStore([]);
export const $myDeliveriesLoading = getMyDeliveriesFx.pending;
export const $myDeliveriesError = getMyDeliveriesFx.failData;
$myDeliveries.on(getMyDeliveriesFx.doneData, (_, data) => data);