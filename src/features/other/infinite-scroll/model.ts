import { createEvent, createStore, Effect, sample } from 'effector';

import { modelFactory } from 'effector-factorio';
import { pending } from 'patronum';

interface FactoryOptions<Payload, Result> {
    trashHold?: number;
    initialPagination: Payload;
    paginationOnLoadNewPage: (payload: Payload) => Payload;
    stopOn?: (payload: Result) => boolean;
    provider: Effect<Payload, Result>;
}

export const factory = modelFactory(
    <Payload, Result>(options: FactoryOptions<Payload, Result>) => {
        const pageEnded = createEvent({
            name: 'pageEnded',
        });
        const pageActual = createEvent();
        const lastPageReached = createEvent();
        const newPageRequested = createEvent<Payload>();

        /**
         * State
         */
        const $enabled = createStore(false).on(
            options.provider.done,
            () => true,
        );
        const $paginationData = createStore<Payload>(options.initialPagination);
        const $loading = pending([options.provider]);
        const $lastPageReached = createStore(false).on(
            lastPageReached,
            () => true,
        );

        sample({
            clock: pageEnded,
            source: $paginationData,
            filter: $enabled,
            fn: (pagination) => pagination,
            target: newPageRequested,
        });

        sample({
            clock: options.provider.doneData,
            source: $paginationData,
            filter: $lastPageReached.map((isLast) => !isLast),
            fn: (payloadStore) => options.paginationOnLoadNewPage(payloadStore),
            target: $paginationData,
        });

        sample({
            clock: options.provider.doneData,
            filter: (payload) => options.stopOn?.(payload) ?? false,
            target: lastPageReached,
        });

        return {
            $enabled,
            $loading,
            pageActual,
            pageEnded,
            newPageRequested,
        };
    },
);
