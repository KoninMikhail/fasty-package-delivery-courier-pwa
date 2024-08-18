import { Model, modelFactory } from 'effector-factorio';
import { createEvent, createStore, Effect, sample, Store } from 'effector';
import { pending } from 'patronum';

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

        const $errors = createStore<Error[]>([])
            .on(options.provider.failData, (state, payload) => [
                ...state,
                payload,
            ])
            .reset([reset, options.provider.done]);
        const $$hasErrors = $errors.map((errors) => errors.length > 0);

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
            target: deliveriesFetchFailed,
        });

        return {
            fetch,
            deliveriesFetched,
            deliveriesFetchFailed,
            $pending,
            $$hasErrors,
        };
    },
);

export type FilterDeliveriesByParametersModel = Model<typeof factory>;
