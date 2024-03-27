import { createEvent, createStore } from 'effector';

export const clickTriggerElement = createEvent();
export const clickCloseArrow = createEvent();
export const startSearch = createEvent();

/**
 * Popup state
 */

export const $isOpened = createStore<boolean>(false)
    .on(clickTriggerElement, () => true)
    .on(clickCloseArrow, () => false)
    .on(startSearch, () => false);
