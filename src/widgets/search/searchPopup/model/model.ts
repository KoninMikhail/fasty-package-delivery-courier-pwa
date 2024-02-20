import { createEvent, createStore } from 'effector';

export const clickSearchOpenTrigger = createEvent();
export const clickCloseArrow = createEvent();
export const clickSearchButton = createEvent();

export const $isOpened = createStore<boolean>(false)
    .on(clickSearchOpenTrigger, () => true)
    .on(clickCloseArrow, () => false);
