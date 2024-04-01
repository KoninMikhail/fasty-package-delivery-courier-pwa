import { createEvent, createStore } from 'effector';
import { persist } from 'effector-storage/local';
import {
    DEFAULT_UPCOMING_DELIVERIES_COUNT,
    UPCOMING_DELIVERIES_LOCAL_STORAGE_KEY,
} from '../config';

export const countChanged = createEvent<number>();

export const $homeUpcomingDeliveriesCount = createStore<number>(
    DEFAULT_UPCOMING_DELIVERIES_COUNT,
).on(countChanged, (_, count) => {
    const MIN_ITEMS_COUNT = 1;
    const isValidCount = Number.isInteger(count) && count >= MIN_ITEMS_COUNT;
    return isValidCount ? count : DEFAULT_UPCOMING_DELIVERIES_COUNT;
});

persist({
    store: $homeUpcomingDeliveriesCount,
    key: UPCOMING_DELIVERIES_LOCAL_STORAGE_KEY,
});
