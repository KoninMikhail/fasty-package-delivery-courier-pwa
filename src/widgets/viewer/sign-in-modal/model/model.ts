import { createEvent, createStore } from 'effector';
import { AuthByEmail } from '@/features/auth/ByEmail';
import { authByEmailFx } from '@/entities/viewer';

export const pressedOpenPrivacyPolicyLink = createEvent();
export const pressedOpenTermsOfUseLink = createEvent();
export const pressedOpenCookiePolicyLink = createEvent();

/**
 * Modal state
 */
export const setVisible = createEvent();
export const setHidden = createEvent();
export const $isSignInModalVisible = createStore<boolean>(false)
    .on(setVisible, () => true)
    .on(setHidden, () => false);

/**
 * Auth form
 */

export const authByEmailModel = AuthByEmail.factory.createModel({
    registerFx: authByEmailFx,
});
