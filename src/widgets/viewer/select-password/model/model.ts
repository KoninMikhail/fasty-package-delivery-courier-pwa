import { ChangePassword } from '@/features/viewer/changePassword';
import { setViewerAccountPasswordFx, sessionModel } from '@/entities/viewer';
import { sharedConfigConstants } from '@/shared/config';
import { createEvent, createStore, sample } from 'effector';

const { APP_DEMO_MODE } = sharedConfigConstants;

/**
 * Events
 */

export const init = createEvent();
export const initOffline = createEvent();
export const setOffline = createEvent<boolean>();
export const passwordChanged = createEvent();
export const reset = createEvent();

/**
 * Network state
 */

export const $isOffline = createStore<Optional<boolean>>(null)
    .on(initOffline, () => true)
    .on(setOffline, (_, payload) => payload)
    .reset(reset);

/**
 * Data Fetching
 */
export const changePasswordModel = ChangePassword.factory.createModel({
    targetUser: sessionModel.$viewerProfileData,
    updateUserFx: setViewerAccountPasswordFx,
    demoMode: APP_DEMO_MODE,
});

sample({
    clock: changePasswordModel.passwordChanged,
    target: passwordChanged,
});
