import { createEvent, createStore } from 'effector';
import { and } from 'patronum';
import { User, userSchema } from '@/shared/api';
import { Done } from 'effector-storage';
import { persist } from 'effector-storage/local';
import { SESSION_USER_PROFILE_LOCAL_STORAGE_KEY } from '../config';
import {
    authByEmailFx,
    changeViewerAvatarFx,
    getViewerProfileFx,
    logoutFx,
} from './effects';

/**
 * Session initialization status
 */
const viewerDataReceived = createEvent<Done<User>>();
const $viewerDataReceived = createStore(false).on(
    viewerDataReceived,
    () => true,
);

export const resourcesLoaded = createEvent();
export const resetResourcesLoaded = createEvent();
const $resourcesLoaded = createStore(false)
    .on(resourcesLoaded, () => true)
    .reset(resetResourcesLoaded);

export const $initSessionComplete = and($viewerDataReceived, $resourcesLoaded);

/**
 * =================================================
 * Viewer profile data
 * =================================================
 */
export const $viewerProfileData = createStore<Optional<User>>(null)
    .on(authByEmailFx.doneData, (_, payload) => payload.user)
    .on(getViewerProfileFx.doneData, (_, payload) => payload)
    .on(changeViewerAvatarFx.doneData, (_, payload) => payload)
    .reset([logoutFx.done, logoutFx.fail]);

export const $$hasProfileData = $viewerProfileData.map((data) => !!data);

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
export const $isAuthorized = and($initSessionComplete, $$hasProfileData);

export { $$isOnline } from './parts/networkState';
export {
    $$isMobile,
    $$isTablet,
    $$isDesktop,
    $$deviceScreen,
} from './parts/deviceInfo';
export {
    getViewerProfileFx,
    authByEmailFx,
    changeViewerAvatarFx,
    logoutFx,
    setViewerAccountPasswordFx,
} from './effects';
