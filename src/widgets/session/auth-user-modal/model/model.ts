import { createEffect, createEvent, createStore, sample } from 'effector';
import { AuthByEmail } from '@/features/auth/authByEmail';

/**
 * Global
 */

export const callAuthModal = createEvent();

/**
 * Modal state
 */
export const setModalOpened = createEvent();
export const setModalClosed = createEvent();
export const $isAuthUserModalOpened = createStore<boolean>(false)
    .on(setModalOpened, () => true)
    .on(setModalClosed, () => false);

sample({
    clock: callAuthModal,
    target: setModalOpened,
});

/**
 * Auth form
 */

const authUserFx = createEffect(async (data) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
    console.log(data);
    throw new Error('error.validation');
});

export const authUserByEmailModel = AuthByEmail.factory.createModel({
    registerFx: authUserFx,
});
