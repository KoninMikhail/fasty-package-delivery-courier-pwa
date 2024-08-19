import { combine, createEvent, createStore, Effect, sample } from 'effector';
import { modelFactory } from 'effector-factorio';
import { throttle } from 'patronum';
import { sharedLibTypeGuards } from '@/shared/lib';

const { isEmpty } = sharedLibTypeGuards;

type Pagination = {
    page: number;
    limit?: number;
};

interface FactoryOptions<T extends Pagination, P> {
    provider: Effect<T, P>;
    throttleTimeoutInMs: number;
    initial: T;
    onTriggerNewPage: (payload: T) => T;
}

export const factory = modelFactory(
    <T extends Pagination, P>(options: FactoryOptions<T, P>) => {
        const pageEndTriggered = createEvent();
        const newPageRequested = createEvent<T>();
        const reset = createEvent();

        /**
         * Guards
         */
        const $readyToLoadNewPage = createStore(false);

        /**
         * State
         */
        const $pagination = createStore<T>(options.initial).reset(reset);
        const $lastPageLoaded = createStore<boolean>(false)
            .on(options.provider.doneData, (_, payload) => isEmpty(payload))
            .reset(reset);
        const $isLoading = options.provider.pending;

        sample({
            clock: throttle(pageEndTriggered, options.throttleTimeoutInMs),
            source: $pagination,
            fn: (pagination) => pagination,
            target: newPageRequested,
        });

        sample({
            clock: newPageRequested,
            source: $pagination,
            filter: combine(
                $readyToLoadNewPage,
                $lastPageLoaded,
                (ready, last) => ready && !last,
            ),
            fn: options.onTriggerNewPage,
            target: $pagination,
        });

        sample({
            clock: newPageRequested,
            fn: () => false,
            target: $readyToLoadNewPage,
        });

        sample({
            clock: options.provider.doneData,
            fn: () => true,
            target: $readyToLoadNewPage,
        });

        return {
            $pagination,
            $isLoading,
            $lastPageLoaded,
            pageEndTriggered,
            newPageRequested,
            reset,
        };
    },
);
