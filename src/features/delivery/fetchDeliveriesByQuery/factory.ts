import { modelFactory } from 'effector-factorio';
import { createEvent, createStore, Effect, sample } from 'effector';
import { Delivery } from '@/shared/api';
import { sharedLibEffector } from '@/shared/lib';

const { collectEffectErrors } = sharedLibEffector;

interface FactoryOptions {
    debounceTime: number;
    minQueryLength: number;
    provider: Effect<string, Delivery[], Error>;
}

export const factory = modelFactory((options: FactoryOptions) => {
    const queryChanged = createEvent<string>();
    const deliveriesFetched = createEvent<Delivery[]>();
    const deliveriesFetchError = createEvent<Error>();

    const $query = createStore<string>('').on(
        queryChanged,
        (_, query) => query,
    );
    const $pending = options.provider.pending;

    sample({
        source: $query,
        filter: (query) => query.length >= options.minQueryLength,
        target: options.provider,
    });

    sample({
        clock: options.provider.doneData,
        target: deliveriesFetched,
    });

    sample({
        clock: options.provider.failData,
        target: deliveriesFetchError,
    });

    /**
     * Errors
     */
    const { $errors } = collectEffectErrors({
        effects: options.provider,
        reset: options.provider.doneData,
    });

    return {
        queryChanged,
        deliveriesFetched,
        deliveriesFetchError,
        $query,
        $pending,
        $errors,
    };
});
