import { createEffect, createEvent, createStore } from 'effector';
import { couriersApi } from '@/shared/api';

export const getViewerProfileDataFx = createEffect({
    name: 'getViewerProfileDataFx',
    handler: async () => couriersApi.getViewer(),
});

export const profileDataStore = createStore<null>(null);
export const setProfileData = createEvent();
export const removeProfileData = createEvent();

profileDataStore.on(setProfileData, (_, data) => data);
profileDataStore.on(removeProfileData, () => null);
profileDataStore.on(getViewerProfileDataFx.doneData, (_, data) => data);
