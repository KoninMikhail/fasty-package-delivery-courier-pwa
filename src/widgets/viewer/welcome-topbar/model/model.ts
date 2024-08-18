import { createEvent, createStore, sample } from 'effector';

import { FetchProfileData } from '@/features/auth/fetchProfileData';

/**
 * Events
 */
export const init = createEvent();
export const fetchData = createEvent();
export const initCompleted = createEvent();

/**
 * Init
 */
export const $isInitialized = createStore<boolean>(false).on(
    initCompleted,
    () => true,
);

/**
 * Handlers
 */
sample({
    clock: [init, fetchData],
    target: FetchProfileData.model.profileDataRequested,
});

sample({
    clock: FetchProfileData.model.profileDataReceived,
    target: initCompleted,
});
