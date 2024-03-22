import { createEffect } from 'effector';
import { apiClient } from '@/shared/api';
import { debug } from 'patronum';

export const getMyDeliveriesFx = createEffect(async () => {
    return apiClient.getMyDeliveries();
});

debug(getMyDeliveriesFx.done);
debug(getMyDeliveriesFx.fail);
