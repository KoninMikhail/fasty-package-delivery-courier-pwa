import { createEffect, createEvent, createStore, sample } from 'effector';
import { apiClient, User, userSchema } from '@/shared/api';
import { persist } from 'effector-storage/local';
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

persist({
    store: $profileDataStore,
    key: 'profileData',
    contract: (raw): raw is User => {
        const result = userSchema.safeParse(raw);
        if (result.success) {
            return true;
        }
        throw result.error;
    },
    done: getFromLocalStorageComplete,
    fail: getFromLocalStorageFail,
});

sample({
    clock: getFromLocalStorageFail,
    target: getViewerProfileDataFx,
});
