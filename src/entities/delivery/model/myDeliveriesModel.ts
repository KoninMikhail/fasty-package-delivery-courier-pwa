import {createEffect, createStore} from 'effector';
import {apiClient} from "@/shared/api";
import {debug} from "patronum";

export const getMyDeliveriesFx = createEffect(async () => {
    return apiClient.fetchUpcomingDeliveries();
}

export const $myDeliveries = createStore([]);
export const $myDeliveriesLoading = getMyDeliveriesFx.pending;
export const $myDeliveriesError = getMyDeliveriesFx.failData;
$myDeliveries.on(getMyDeliveriesFx.doneData, (_, data) => data);
