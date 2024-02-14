import { createEffect, createStore } from 'effector';
import { apiClient, User } from '@/shared/api';

/**
 * Effect for fetching profile data
 */
export const getViewerProfileDataFx = createEffect<void, User>({
    name: 'getViewerProfileDataFx',
    handler: async () => apiClient.getMe(),
});

/**
 * Store for profile data
 */
export const $profileDataStore = createStore<Nullable<User>>(null).on(
    getViewerProfileDataFx.doneData,
    (_, data) => data,
);
