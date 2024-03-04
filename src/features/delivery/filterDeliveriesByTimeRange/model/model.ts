import { modelFactory } from 'effector-factorio';
import { combine, createEvent, createStore, Store } from 'effector';
import { Delivery } from '@/shared/api';
import { sharedLibHelpers } from '@/shared/lib';
import { filterAndSortDeliveries } from '@/features/delivery/filterDeliveriesByTimeRange/lib/utils';
import { debug, readonly } from 'patronum';

const { getTimesRange } = sharedLibHelpers;

interface FactoryOptions {
    startTime: string;
    endTime: string;
    stepMins: number;
    sourceStore: Store<Delivery[]>;
}
export const factory = modelFactory((options: FactoryOptions) => {
    const timePicked = createEvent<string>();
    console.log(getTimesRange('8:00', '20:00', 90));
    const timesRange = createStore<string[]>(
        getTimesRange(options.startTime, options.endTime, options.stepMins),
    );
    const $readOnlyTimesRange = readonly(timesRange);

    debug(timesRange);

    const $selectedTimeRange = createStore<string[]>([]).on(
        timePicked,
        (state, time) => {
            const isSelected = state.includes(time);
            return isSelected
                ? state.filter((t) => t !== time)
                : [...state, time];
        },
    );

    const $filteredDeliveries = combine(
        options.sourceStore,
        $selectedTimeRange,
        (deliveries, range) =>
            range.length === 0
                ? deliveries
                : filterAndSortDeliveries(deliveries, range),
    );

    return {
        $filteredDeliveries,
        $selectedTimeRange,
        $readOnlyTimesRange,
        timePicked,
    };
});
