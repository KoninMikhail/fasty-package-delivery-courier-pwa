import { createEvent, createStore, sample } from 'effector';
import { and } from 'patronum';
import { User } from '@/shared/api';
import {
    authByEmailFx,
    changeViewerAvatarFx,
    getViewerProfileFx,
    logoutFx,
    setViewerAccountPasswordFx,
} from './effects';

export const initSession = createEvent();
export const requestViewerLogout = createEvent();

const $online = createStore(false);

export const $initSessionComplete = createStore(false)
    .on(getViewerProfileFx.done, () => true)
    .on(getViewerProfileFx.fail, () => true);

/**
 * Viewer profile data
 */
export const $viewerProfileData = createStore<Nullable<User>>(null)
    .on(getViewerProfileFx.doneData, (_, payload) => payload)
    .on(changeViewerAvatarFx.doneData, (_, payload) => payload)
    .reset([
        logoutFx.done,
        logoutFx.fail,
        authByEmailFx.fail,
        getViewerProfileFx.fail,
    ]);

export const $$hasProfileData = $viewerProfileData.map((data) => !!data);

/**
 * Authorization status
 */
export const $isAuthorized = and($initSessionComplete, $$hasProfileData);

sample({
    clock: initSession,
    source: $initSessionComplete,
    filter: (ready) => !ready,
    target: [getViewerProfileFx],
});

sample({
    clock: requestViewerLogout,
    source: $online,
    filter: (online) => online === true,
    target: logoutFx,
});

sample({
    clock: authByEmailFx.doneData,
    target: getViewerProfileFx,
});

sample({
    clock: setViewerAccountPasswordFx.doneData,
    target: logoutFx,
});
