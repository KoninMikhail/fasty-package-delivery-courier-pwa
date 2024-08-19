import { Model, modelFactory } from 'effector-factorio';
import { createEvent, createStore, Effect, sample, Store } from 'effector';
import { pending } from 'patronum';
import { sharedLibTypeGuards } from '@/shared/lib';
import httpStatus from 'http-status';
import axios from 'axios';

const { isEmpty } = sharedLibTypeGuards;

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

        const $$hasCriticalErrors = $errors.map((errors) => {
            const criticalErrorCodes = new Set([
                httpStatus.INTERNAL_SERVER_ERROR,
                httpStatus.BAD_REQUEST,
                httpStatus.BAD_GATEWAY,
            ]) as Set<number>;
            return errors.some((error) => {
                if (axios.isAxiosError(error)) {
                    return criticalErrorCodes.has(error.response?.status ?? 0);
                }
                return false;
            });
        });

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
            $errors,
            $$hasCriticalErrors,
        };
    },
);

export type FilterDeliveriesByParametersModel = Model<typeof factory>;
