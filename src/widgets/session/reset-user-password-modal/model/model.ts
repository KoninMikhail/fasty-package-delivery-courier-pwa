import { createEffect, createEvent, createStore, sample } from 'effector';
import { ResetByEmail } from '@/features/auth/resetByEmail';

/**
 * Global
 */

export const callResetModal = createEvent();

/**
 * Modal state
 */
export const setModalOpened = createEvent();
export const setModalClosed = createEvent();
export const $isResetUserModalOpened = createStore<boolean>(false)
    .on(setModalOpened, () => true)
    .on(setModalClosed, () => false);

sample({
    clock: callResetModal,
    target: setModalOpened,
});

const resetUserFx = createEffect(async (data) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
});

/**
 * Reset form state
 */
export const resetUserModel = ResetByEmail.factory.createModel({
    resetFx: resetUserFx,
});
