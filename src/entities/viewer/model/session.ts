import { createEvent, createStore } from 'effector';
import { User, userSchema } from '@/shared/api';
import { Done } from 'effector-storage';
import { persist } from 'effector-storage/local';
import { delay } from 'patronum';
import { SESSION_USER_PROFILE_LOCAL_STORAGE_KEY } from '../config';
import {
    authByEmailFx,
    changeViewerAvatarFx,
    getViewerProfileFx,
} from './effects';

/**
 * Session initialization status
 */
const viewerDataReceived = createEvent<Done<User>>();
export const $viewerDataReceived = createStore(false).on(
    viewerDataReceived,
    () => true,
);

export const $initSessionComplete = $viewerDataReceived;

/**
 * =================================================
 * Viewer profile data
 * =================================================
 */
export const clearViewerProfileData = createEvent();
export const $viewerProfileData = createStore<Optional<User>>(null)
    .on(authByEmailFx.doneData, (_, payload) => payload.user)
    .on(getViewerProfileFx.doneData, (_, payload) => payload)
    .on(delay(changeViewerAvatarFx.doneData, 1000), (_, payload) => payload)
    .reset(clearViewerProfileData);

/*
 * Persist viewer profile data from local storage for correctly work offline mode
 *
 * It takes data from localstorage on appInit and if it's valid, it sets it to the store.
 * If it's not valid, it triggers re-fetch data from backend and if re-fetch fails, it triggers logout.
 */
persist({
    store: $viewerProfileData,
    key: SESSION_USER_PROFILE_LOCAL_STORAGE_KEY,
    contract: (raw): raw is User => userSchema.safeParse(raw).success,
    done: viewerDataReceived,
});

/**
 * Authorization status
 */
export const $isAuthorized = $viewerProfileData.map((data) => data ?? null);

export {
    getViewerProfileFx,
    authByEmailFx,
    changeViewerAvatarFx,
    logoutFx,
    setViewerAccountPasswordFx,
} from './effects';
