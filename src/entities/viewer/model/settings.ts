import { createEvent, createStore } from 'effector';
import { persist } from 'effector-storage/local';
import {
    DEFAULT_UPCOMING_DELIVERIES_COUNT,
    UPCOMING_DELIVERIES_LOCAL_STORAGE_KEY,
} from '../config';

/**
 * Defines an event `countChanged` to be dispatched when the count of upcoming deliveries changes.
 * This event expects a payload of type `number`.
 */
export const countChanged = createEvent<number>();

/**
 * Initializes a store `$homeUpcomingDeliveriesCount` to hold the count of upcoming deliveries
 * shown on the homepage. The store is initialized with `DEFAULT_UPCOMING_DELIVERIES_COUNT` from entity config.
 *
 * The store updates its state in response to `countChanged` events. It ensures that the count
 * always remains valid, defaulting to `DEFAULT_UPCOMING_DELIVERIES_COUNT` if invalid values are
 * received. Specifically, the count must be an integer greater than or equal to `1` to be considered valid.
 */
export const $homeUpcomingDeliveriesCount = createStore<number>(
    DEFAULT_UPCOMING_DELIVERIES_COUNT,
);

$homeUpcomingDeliveriesCount.on(countChanged, (_, count) => {
    // Defines the minimum number of items to be considered valid.
    const MIN_ITEMS_COUNT = 1;
    // Validates the count to ensure it is an integer and meets the minimum item count requirement.
    const isValidCount = Number.isInteger(count) && count >= MIN_ITEMS_COUNT;
    // Updates the store's state with the new count if valid, otherwise resets to the default count.
    return isValidCount ? count : DEFAULT_UPCOMING_DELIVERIES_COUNT;
});

/**
 * Persists the `$homeUpcomingDeliveriesCount` store to local storage using the key
 * On initialization, it retrieves the count from local storage and sets it to the store.
 */
persist({
    store: $homeUpcomingDeliveriesCount,
    key: UPCOMING_DELIVERIES_LOCAL_STORAGE_KEY,
});
