import { changeViewerAvatarFx } from '@/entities/viewer';
import { ChangeAvatar } from '@/features/viewer/changeAvatar';
import { createEvent, createStore, sample } from 'effector';
import { isUnAuthorizedError } from '@/shared/lib/type-guards';
import { RefreshToken } from '@/features/auth/refreshToken';

/**
 * Events
 */

export const init = createEvent();
export const initOffline = createEvent();
export const setOffline = createEvent<boolean>();
export const reset = createEvent();

/**
 * Network state
 */

export const $isOffline = createStore<Optional<boolean>>(null)
    .on(initOffline, () => true)
    .on(setOffline, (_, payload) => payload)
    .reset(reset);

/**
 * Data
 */

export const changeAvatarModel = ChangeAvatar.factory.createModel({
    minWidth: 200,
    minHeight: 200,
    resizeToMaxWidth: 350,
    resizeToMaxHeight: 350,
    changeAvatarFx: changeViewerAvatarFx,
});

sample({
    clock: changeAvatarModel.UploadError,
    filter: (error) => isUnAuthorizedError(error),
    target: RefreshToken.tokenRefreshRequested,
});

sample({
    clock: RefreshToken.updateTokenSuccess,
    target: changeAvatarModel.retry,
});

sample({
    clock: reset,
    target: changeAvatarModel.reset,
});

const initComplete = createEvent();

export const $isInitialized = createStore<boolean>(false)
    .on(initComplete, () => true)
    .reset(init);
