import { modelFactory } from 'effector-factorio';
import { combine, createEvent, createStore, sample, Store } from 'effector';
import { Delivery } from '@/shared/api';
import { debounce } from 'patronum';

export type DeliveryType = 'unset' | 'car' | 'foot';
export type WeightRange = [number, number];

interface FactoryOptions {
    sourceStore: Store<Delivery[]>;
}
export const factory = modelFactory((options: FactoryOptions) => {
    const expressPressed = createEvent();
    const typeSelected = createEvent<Set<DeliveryType>>();
    const weightChanged = createEvent<WeightRange>();
    const filtersReset = createEvent();

    const $type = createStore<Set<DeliveryType>>(new Set(['unset'])).reset(
        filtersReset,
    );
    const $express = createStore<boolean>(false).reset(filtersReset);
    const $weight =
        createStore<Nullable<WeightRange>>(null).reset(filtersReset);

    $express.on(expressPressed, (state) => !state);
    $type.on(typeSelected, (_, selection) => selection);

    const $filteredStore = combine(options.sourceStore, (deliveries) => {
        return deliveries;
    });

    sample({
        clock: debounce(weightChanged, 1000),
        target: $weight,
    });

    return {
        $filteredStore,
        $type,
        $express,
        $weight,
        expressPressed,
        typeSelected,
        weightChanged,
        filtersReset,
    };
});
