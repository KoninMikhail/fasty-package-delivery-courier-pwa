import { createEffect } from 'effector';
import { apiClient } from '@/shared/api';

export const getDeliveriesHistoryFx = createEffect(async () =>
    apiClient.getDeliveriesHistory(),
);
