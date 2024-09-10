import { createEvent, createStore, sample } from 'effector';
import { AuthByEmail } from '@/features/auth/ByEmail';
import { authByEmailFx } from '@/entities/viewer';

export const userSuccessAuthorized = createEvent();
export const pressedOpenPrivacyPolicyLink = createEvent();
export const pressedOpenTermsOfUseLink = createEvent();
export const pressedOpenCookiePolicyLink = createEvent();

/**
 * Auth form
 */

export const authByEmailModel = AuthByEmail.factory.createModel({
    registerFx: authByEmailFx,
});

/**
 * Modal state
 */
export const setVisible = createEvent();
export const setHidden = createEvent();
export const $isSignInModalVisible = createStore<boolean>(false)
    .on(setVisible, () => true)
    .on(setHidden, () => false)
    .reset(authByEmailModel.authSuccess);

/**
 * Callbacks
 */
sample({
    clock: authByEmailModel.authSuccess,
    target: userSuccessAuthorized,
});
