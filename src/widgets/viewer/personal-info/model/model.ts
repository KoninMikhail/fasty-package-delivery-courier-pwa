import { createEvent, createStore } from 'effector';

/**
 * Events
 */

export const init = createEvent();
export const reset = createEvent();

/**
 * Widget initialization
 */

const initComplete = createEvent();

export const $isInitialized = createStore<boolean>(false)
    .on(initComplete, () => true)
    .reset(init);
