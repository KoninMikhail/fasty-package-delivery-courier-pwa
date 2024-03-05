import { modelFactory } from 'effector-factorio';
import { combine, createEvent, createStore, sample, Store } from 'effector';
import { Delivery } from '@/shared/api';
import { debounce, debug } from 'patronum';
import { MAX_WEIGHT_KG } from '@/features/delivery/filterDeliveriesByParams/config';

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
    const $weight = createStore<WeightRange>([0, MAX_WEIGHT_KG]).reset(
        filtersReset,
    );

    $express.on(expressPressed, (state) => !state);
    $type.on(typeSelected, (_, selection) => selection);

    const $filteredStore = combine(
        options.sourceStore,
        $express,
        $type,
        $weight,
        (deliveries, isExpress, type, weight) => {
            const isRequiredFiltering =
                isExpress ||
                !type.has('unset') ||
                (weight[0] > 0 && weight[1] < MAX_WEIGHT_KG);

            if (isRequiredFiltering) {
                return deliveries.filter((delivery) => {
                    const meetsExpressCriteria = isExpress === delivery.express;
                    const meetsTypeCriteria =
                        type.has('unset') ||
                        (type.has('car') && delivery.car) ||
                        (type.has('foot') && !delivery.car);
                    const meetsWeightCriteria =
                        Number(delivery.weight) >= weight[0] &&
                        Number(delivery.weight) <= weight[1];

                    return (
                        meetsExpressCriteria &&
                        meetsTypeCriteria &&
                        meetsWeightCriteria
                    );
                });
            }

            return deliveries;
        },
    );

    debug($filteredStore);

    sample({
        clock: debounce(weightChanged, 500),
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