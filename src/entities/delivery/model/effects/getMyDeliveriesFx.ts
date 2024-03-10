import { createEffect } from 'effector';
import { apiClient } from '@/shared/api';

export const getMyDeliveriesFx = createEffect(async () => {
    return apiClient.getMyDeliveries();
});
