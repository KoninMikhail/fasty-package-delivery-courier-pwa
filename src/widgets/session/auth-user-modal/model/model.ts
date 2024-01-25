import { createEvent, createStore, sample } from 'effector';

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
