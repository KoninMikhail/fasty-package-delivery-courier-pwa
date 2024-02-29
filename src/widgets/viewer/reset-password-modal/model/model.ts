import { createEvent, createStore } from 'effector';
import { ResetByEmail } from '@/features/reset/ByEmail';
import { resetByEmailRequestFx } from '@/entities/viewer';

/**
 * Modal state
 */
export const setVisible = createEvent();
export const setHidden = createEvent();
export const $isResetUserModalVisible = createStore<boolean>(false)
    .on(setVisible, () => true)
    .on(setHidden, () => false);

/**
 * Reset form state
 */
export const resetUserModel = ResetByEmail.factory.createModel({
    resetFx: resetByEmailRequestFx,
});
