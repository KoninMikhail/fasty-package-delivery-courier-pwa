import { getViewerSearchQueriesHistoryFx } from '@/entities/viewer';
import { createEvent, sample } from 'effector';

export const fetch = createEvent();
export const queryFetched = createEvent<string[]>();
export const queryFetchFailed = createEvent<Error>();

sample({
    clock: fetch,
    target: getViewerSearchQueriesHistoryFx,
});

sample({
    clock: getViewerSearchQueriesHistoryFx.doneData,
    target: queryFetched,
});

sample({
    clock: getViewerSearchQueriesHistoryFx.failData,
    target: queryFetchFailed,
});
