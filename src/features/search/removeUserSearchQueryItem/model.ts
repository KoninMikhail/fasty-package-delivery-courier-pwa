import { createEvent, sample } from 'effector';
import { removeUserSearchQueryItemFx } from '@/features/search/removeUserSearchQueryItem/effects';

export const removeQueryItem = createEvent<string>();
export const queryItemRemoved = createEvent<string>();
export const queryItemRemoveFailed = createEvent<Error>();

sample({
    clock: removeQueryItem,
    target: removeUserSearchQueryItemFx,
});

sample({
    clock: removeUserSearchQueryItemFx.done,
    fn: ({ params }) => params,
    target: queryItemRemoved,
});

sample({
    clock: removeUserSearchQueryItemFx.failData,
    target: queryItemRemoveFailed,
});
