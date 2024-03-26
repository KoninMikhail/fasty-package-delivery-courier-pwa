import { modelFactory } from 'effector-factorio';
import { createEvent, createStore, Effect, sample } from 'effector';
import { Delivery } from '@/shared/api';

interface FactoryOptions {
    debounceTime: number;
    minQueryLength: number;
    searchFx: Effect<string, Delivery[], Error>;
}

export const factory = modelFactory((options: FactoryOptions) => {
    const queryChanged = createEvent<string>();

    const $query = createStore<string>('').on(
        queryChanged,
        (_, query) => query,
    );
    const $pending = options.searchFx.pending;
    const $searchResults = createStore<Delivery[]>([]);

    sample({
        source: $query,
        filter: (query) => query.length >= options.minQueryLength,
        target: options.searchFx,
    });

    sample({
        clock: options.searchFx.doneData,
        target: $searchResults,
    });

    return {
        queryChanged,
        $searchResults,
        $query,
        $pending,
    };
});
