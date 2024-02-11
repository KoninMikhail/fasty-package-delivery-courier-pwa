import { createEffect, createEvent, createStore } from 'effector';
import { couriersApi, User } from '@/shared/api';

/**
 * Effect for fetching profile data
 */
export const getViewerProfileDataFx = createEffect({
    name: 'getViewerProfileDataFx',
    handler: async () => couriersApi.getViewer(),
});

/**
 * Store for profile data
 */
export const profileDataStore = createStore<User | null>(null);
export const setProfileData = createEvent();
export const removeProfileData = createEvent();

/**
 * Actions for profile data
 */
profileDataStore.on(setProfileData, (_, data) => data);
profileDataStore.on(removeProfileData, () => null);
profileDataStore.on(getViewerProfileDataFx.doneData, (_, data) => data);
