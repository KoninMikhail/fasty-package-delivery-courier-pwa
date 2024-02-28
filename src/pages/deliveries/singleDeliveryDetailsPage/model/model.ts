import { createGate } from 'effector-react';
import { createEffect, createStore, sample } from 'effector';
import { apiClient } from '@/shared/api';

/**
 * Gateway for the delivery details page
 */
export const DeliveryDetailsPageGateway = createGate<{ deliveryId?: string }>();

/**
 * Fetches delivery details by id
 */
const fetchDeliveryDetailsFx = createEffect(async (data: string) => {
    return apiClient.fetchDeliveryById({ params: { deliveryId: data } });
});

sample({
    clock: DeliveryDetailsPageGateway.open,
    filter: (data) => !!data.deliveryId,
    fn: (data) => data.deliveryId,
    target: fetchDeliveryDetailsFx,
});

/**
 * Page
 */

export const $deliveryId = createStore<string>('').on(
    DeliveryDetailsPageGateway.open,
    (_, data) => data.deliveryId,
);

/**
 * Delivery details store
 */

export const $deliveryDetailsStore = createStore<string>('')
    .on(fetchDeliveryDetailsFx.doneData, (_, data) => data)
    .reset(DeliveryDetailsPageGateway.close);
