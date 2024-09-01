import { Model, modelFactory } from 'effector-factorio';
import { createEvent, createStore, Effect, sample, Store } from 'effector';
import { pending } from 'patronum';
import { addError } from '@/shared/errors';

interface FactoryOptions<T extends Pagination, Pagination, Payload> {
    provider: Effect<T, Payload>;
    pagination: Store<Pagination>;
    sourceData?: Store<Omit<T, keyof Pagination>>;
}
export const factory = modelFactory(
    <T extends PaginationData, PaginationData, Payload>(
        options: FactoryOptions<T, PaginationData, Payload>,
    ) => {
        const fetch = createEvent();
        const deliveriesFetched = createEvent<Payload>();
        const deliveriesFetchFailed = createEvent<Error>();
        const reset = createEvent();

        const $pending = pending({ effects: [options.provider] });

        const $attachedData =
            options.sourceData ??
            createStore<Omit<T, keyof PaginationData>>(
                {} as Omit<T, keyof PaginationData>,
            );

        /**
         * Handlers
         */
        sample({
            clock: fetch,
            source: {
                pagination: options.pagination,
                sourceData: $attachedData,
            },
            fn: ({ pagination, sourceData }) => {
                return {
                    ...pagination,
                    ...sourceData,
                } as T;
            },
            target: options.provider,
        });

        sample({
            clock: options.provider.doneData,
            target: deliveriesFetched,
        });

        sample({
            clock: options.provider.failData,
            target: [deliveriesFetchFailed, addError],
        });

        return {
            fetch,
            deliveriesFetched,
            deliveriesFetchFailed,
            $pending,
            reset,
        };
    },
);

export type FilterDeliveriesByParametersModel = Model<typeof factory>;
