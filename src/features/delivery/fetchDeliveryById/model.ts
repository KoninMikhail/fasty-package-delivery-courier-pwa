import { createEvent, sample } from 'effector';
import { Delivery } from '@/shared/api';
import { getDeliveryByIdFx } from '@/entities/delivery/effects/getDeliveryByIdFx';

export const fetch = createEvent<Delivery['id']>();
export const fetchSuccess = createEvent<Delivery>();
export const fetchFail = createEvent<Error>();

sample({
    source: fetch,
    target: getDeliveryByIdFx,
});

sample({
    source: getDeliveryByIdFx.doneData,
    target: fetchSuccess,
});

sample({
    source: getDeliveryByIdFx.failData,
    target: fetchFail,
});
