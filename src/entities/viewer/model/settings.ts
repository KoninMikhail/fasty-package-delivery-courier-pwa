import { createEvent, createStore } from 'effector';
import { DEFAULT_UPCOMING_DELIVERIES_COUNT } from '../config';

export const countChanged = createEvent<number>();

export const $homeUpcomingDeliveriesCount = createStore<number>(
    DEFAULT_UPCOMING_DELIVERIES_COUNT,
).on(countChanged, (_, count) => {
    const MIN_ITEMS_COUNT = 1;
    const isValidCount = Number.isInteger(count) && count >= MIN_ITEMS_COUNT;
    return isValidCount ? count : DEFAULT_UPCOMING_DELIVERIES_COUNT;
});
