// Importing necessary dependencies
import { combine, createEvent, createStore, sample } from 'effector';
import { persist } from 'effector-storage/local';
import { sessionModel } from '@/entities/viewer';
import { SearchQueryHistoryItem } from '../types';

/**
 * Event to add a query string to the search history.
 */
export const addQueryToHistory = createEvent<string>();

/**
 * Event to remove a query item from the search history.
 */
export const removeQueryFromHistory = createEvent<string>();

/**
 * The store that holds the search query history.
 */
export const $queryHistory = createStore<SearchQueryHistoryItem[]>([]);
export const $$currentUserQueryHistory = combine(
    $queryHistory,
    sessionModel.$sessionStore,
    (history, user) => {
        if (!user) return [];
        return history.filter((item) => item.id === user.id);
    },
);

// Persist the search query history in local storage for future sessions.
persist({ store: $queryHistory, key: 'queryHistory' });

// Sample logic for adding a query to the history
sample({
    clock: addQueryToHistory,
    source: {
        user: sessionModel.$sessionStore,
        history: $queryHistory,
    },
    /**
     * Function to add or move a query to the beginning of the history.
     */
    fn: ({ user, history }, query) => {
        const userId = user?.id || 0;
        const currentHistoryItem = {
            query,
            id: userId,
            timestamp: Date.now(),
        };
        const isItemExist = history.some((item) => item.query === query);

        if (isItemExist) {
            const isFirst = history[0].query === query;

            if (isFirst) return history;

            return [
                currentHistoryItem,
                ...history.filter(
                    (item) => item.query !== currentHistoryItem.query,
                ),
            ];
        }
        return [currentHistoryItem, ...history];
    },
    target: $queryHistory,
});

// Sample logic for removing a query from the history
sample({
    clock: removeQueryFromHistory,
    source: $queryHistory,
    fn: (history, query) => history.filter((item) => item.query !== query),
    target: $queryHistory,
});
