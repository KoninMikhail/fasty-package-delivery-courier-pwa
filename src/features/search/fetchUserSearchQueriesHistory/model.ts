import { createEvent, sample } from 'effector';
import { getUserSearchQueriesHistoryFx } from './effects';

export const fetch = createEvent({
    name: 'fetchUserSearchQueriesHistory',
});
export const queryFetched = createEvent<string[]>();
export const queryFetchFailed = createEvent<Error>();

sample({
    clock: fetch,
    target: getUserSearchQueriesHistoryFx,
});

sample({
    clock: getUserSearchQueriesHistoryFx.doneData,
    target: queryFetched,
});

sample({
    clock: getUserSearchQueriesHistoryFx.failData,
    target: queryFetchFailed,
});
