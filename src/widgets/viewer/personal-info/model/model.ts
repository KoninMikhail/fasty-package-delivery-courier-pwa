import { changeViewerAvatarFx } from '@/entities/viewer';
import { ChangeAvatar } from '@/features/viewer/changeAvatar';
import { createEvent, createStore } from 'effector';

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
    resizeToMaxWidth: 600,
    resizeToMaxHeight: 600,
    changeAvatarFx: changeViewerAvatarFx,
});

/**
 * Widget initialization
 */

const initComplete = createEvent();

export const $isInitialized = createStore<boolean>(false)
    .on(initComplete, () => true)
    .reset(init);
