import { createEffect, createEvent, createStore, sample } from 'effector';
import { apiClient, User } from '@/shared/api';
import { Done, Fail } from 'effector-storage';

const getFromLocalStorageComplete = createEvent<Done<unknown>>();
const getFromLocalStorageFail = createEvent<Fail<Error>>();

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

sample({
    clock: getFromLocalStorageFail,
    target: getViewerProfileDataFx,
});
