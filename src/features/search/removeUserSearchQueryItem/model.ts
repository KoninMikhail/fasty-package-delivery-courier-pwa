import { createEvent, sample } from 'effector';
import { removeViewerSearchQueryItemFx } from '@/entities/viewer';
import { addError } from '@/shared/errors';

export const removeQueryItem = createEvent<string>();
export const queryItemRemoved = createEvent<string>();
export const queryItemRemoveFailed = createEvent<Error>();

sample({
    clock: removeQueryItem,
    target: removeViewerSearchQueryItemFx,
});

sample({
    clock: removeViewerSearchQueryItemFx.done,
    fn: ({ params }) => params,
    target: queryItemRemoved,
});

sample({
    clock: removeViewerSearchQueryItemFx.failData,
    target: [queryItemRemoveFailed, addError],
});
