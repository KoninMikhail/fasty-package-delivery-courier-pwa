import { createEvent, createStore, sample } from 'effector';
import { and } from 'patronum';
import { User } from '@/shared/api';
import { sharedConfigConstants } from '@/shared/config';
import { Done } from 'effector-storage';
import {
    authByEmailFx,
    changeViewerAvatarFx,
    getViewerProfileFx,
    logoutFx,
    refreshAuthTokensFx,
    setViewerAccountPasswordFx,
} from './effects';
import { $$isOnline } from './parts/networkState';

const { APP_DEMO_MODE } = sharedConfigConstants;

export const viewerDataReceived = createEvent<Done<User>>();
export const requestViewerLogout = createEvent();

/**
 * Session initialization status
 */
export const $initSessionComplete = createStore(true).on(
    viewerDataReceived,
    () => true,
);

/**
 * Viewer profile data
 */
export const $viewerProfileData = createStore<Nullable<User>>(null)
    .on(authByEmailFx.doneData, (_, payload) => payload)
    .on(getViewerProfileFx.doneData, (_, payload) => payload)
    .on(changeViewerAvatarFx.doneData, (_, payload) => payload)
    .reset([logoutFx.done, logoutFx.fail]);

export const $$hasProfileData = $viewerProfileData.map((data) => !!data);

/**
 * Authorization status
 */
export const $isAuthorized = and($initSessionComplete, $$hasProfileData);

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
    clock: refreshAuthTokensFx.fail,
    target: logoutFx,
});

sample({
    clock: setViewerAccountPasswordFx.doneData,
    filter: () => !APP_DEMO_MODE,
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
