import { createEvent, sample } from 'effector';
import { Delivery } from '@/shared/api';
import { getDeliveryByIdFx } from '@/entities/delivery';
import { addError } from '@/shared/errors';

/**
 * Event to initiate fetching a delivery by its ID.
 * @event
 */
export const fetch = createEvent<Delivery['id']>();

/**
 * Event triggered when a delivery is successfully fetched.
 * @event
 */
export const fetchSuccess = createEvent<Delivery>();

/**
 * Event triggered when fetching a delivery fails.
 * @event
 */
export const fetchFail = createEvent<Error>();

// Sample to initiate the getDeliveryByIdFx effect when fetch event is triggered.
sample({
    source: fetch,
    target: getDeliveryByIdFx,
});

// Sample to trigger fetchSuccess event when getDeliveryByIdFx effect completes successfully.
sample({
    source: getDeliveryByIdFx.doneData,
    target: fetchSuccess,
});

// Sample to trigger fetchFail and addError events when getDeliveryByIdFx effect fails.
sample({
    source: getDeliveryByIdFx.failData,
    target: [fetchFail, addError],
});
