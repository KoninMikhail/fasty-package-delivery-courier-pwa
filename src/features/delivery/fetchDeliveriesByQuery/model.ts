import { modelFactory } from 'effector-factorio';
import { createEvent, createStore, Effect, sample } from 'effector';
import { Delivery } from '@/shared/api';
import { debug } from 'patronum';

interface FactoryOptions {
    debounceTime: number;
    minQueryLength: number;
    provider: Effect<string, Delivery[], Error>;
}

export const factory = modelFactory((options: FactoryOptions) => {
    const queryChanged = createEvent<string>();
    const deliveriesFetched = createEvent<Delivery[]>();

    debug({
        queryChanged,
    });

    const $query = createStore<string>('').on(
        queryChanged,
        (_, query) => query,
    );
    const $pending = options.provider.pending;
    const $errors = createStore<Error[]>([])
        .on(options.provider.failData, (state, error) => [...state, error])
        .reset(options.provider.doneData);

    sample({
        source: $query,
        filter: (query) => query.length >= options.minQueryLength,
        target: options.provider,
    });

    sample({
        clock: options.provider.doneData,
        target: deliveriesFetched,
    });

    return {
        queryChanged,
        deliveriesFetched,
        $query,
        $errors,
        $pending,
    };
});
