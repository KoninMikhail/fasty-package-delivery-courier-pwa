import { createEffect } from 'effector';
import { apiClient, Delivery } from '@/shared/api';
import { Pagination } from '@/shared/api/types/PaginationTypes';

export const getDeliveriesHistoryFx = createEffect<void, Pagination<Delivery>>(
    async () => apiClient.getDeliveriesHistory(),
);
