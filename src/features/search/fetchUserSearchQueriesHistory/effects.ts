import { createEffect } from 'effector';
import { apiClient } from '@/shared/api';

export const getUserSearchQueriesHistoryFx = createEffect<void, string[]>({
    handler: async () => {
        return apiClient.getUserSearchQueriesHistory();
    },
});
