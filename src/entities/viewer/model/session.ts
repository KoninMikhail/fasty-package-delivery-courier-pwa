import { createEvent, createStore, sample } from 'effector';
import { and, condition, once } from 'patronum';
import { User } from '@/shared/api';
import { AppGate } from '@/shared/lib/app';
import {
    authByEmailFx,
    changeViewerAvatarFx,
    getViewerProfileFx,
    logoutFx,
    setViewerAccountPasswordFx,
} from './effects';
import { $$isOnline } from './parts/networkState';

export const initSession = createEvent();
export const validateSession = createEvent();
export const forceInitComplete = createEvent();
export const requestViewerLogout = createEvent();

sample({
    clock: once(AppGate.open),
    target: initSession,
});

/**
 * Session initialization status
 */
export const $initSessionComplete = createStore(false)
    .on(forceInitComplete, () => true)
    .on(getViewerProfileFx.done, () => true)
    .on(getViewerProfileFx.fail, () => true);

/**
 * Viewer profile data
 */
export const $viewerProfileData = createStore<Nullable<User>>(null)
    .on(authByEmailFx.doneData, (_, payload) => payload.user)
    .on(getViewerProfileFx.doneData, (_, payload) => payload)
    .on(changeViewerAvatarFx.doneData, (_, payload) => payload)
    .reset([logoutFx.done, logoutFx.fail]);

export const $$hasProfileData = $viewerProfileData.map((data) => !!data);

/**
 * Authorization status
 */
export const $isAuthorized = and($initSessionComplete, $$hasProfileData);

/**
 * Handle session initialization
 */

condition({
    source: initSession,
    if: $$isOnline.map((isOnline) => isOnline),
    then: getViewerProfileFx,
    else: forceInitComplete,
});

/**
 * Handle logout
 */
sample({
    clock: requestViewerLogout,
    source: {
        isOnline: $$isOnline,
        isAuthorized: $isAuthorized,
    },
    filter: ({ isOnline, isAuthorized }) => isOnline && isAuthorized,
    target: logoutFx,
});

sample({
    clock: setViewerAccountPasswordFx.doneData,
    target: logoutFx,
});

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
