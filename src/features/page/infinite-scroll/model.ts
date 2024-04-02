import { createEvent, createStore, Effect, sample } from 'effector';

import { modelFactory } from 'effector-factorio';
import { interval } from 'patronum';

interface FactoryOptions<Payload, Result> {
    trashHold?: number;
    initialPagination: Payload;
    paginationOnLoadNewPage: (payload: Payload) => Payload;
    stopOn?: (payload: Result) => boolean;
    requestContentFx: Effect<Payload, Result>;
}

export const factory = modelFactory(
    <Payload, Result>(options: FactoryOptions<Payload, Result>) => {
        const startContentRequests = createEvent();
        const stopContentRequests = createEvent();
        const scrollEnd = createEvent();

        const $store = createStore<Payload>(options.initialPagination);
        const $ended = createStore<boolean>(false);
        const $loading = options.requestContentFx.pending;
        const $errors = createStore<string[]>([]);

        $ended.on(scrollEnd, () => true);

        const { tick } = interval({
            timeout: 500,
            start: startContentRequests,
            stop: stopContentRequests,
        });

        sample({
            clock: tick,
            source: $store,
            filter: $ended.map((ended) => !ended),
            fn: (payloadStore) => payloadStore,
            target: options.requestContentFx,
        });

        sample({
            clock: options.requestContentFx.doneData,
            source: $store,
            filter: $ended.map((ended) => !ended),
            fn: (payloadStore) => options.paginationOnLoadNewPage(payloadStore),
            target: $store,
        });

        sample({
            clock: options.requestContentFx.doneData,
            filter: (payload) => options.stopOn?.(payload) ?? false,
            target: scrollEnd,
        });

        sample({
            clock: options.requestContentFx.failData,
            source: $errors,
            fn: (errors, error) => {
                return [error.message, ...errors];
            },
            target: [$errors, scrollEnd],
        });

        return {
            $loading,
            stopContentRequests,
            startContentRequests,
        };
    },
);
