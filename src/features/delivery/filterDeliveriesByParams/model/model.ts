import { modelFactory } from 'effector-factorio';
import { Effect } from 'effector';

interface FactoryOptions {
    filterFx: Effect<void, void>;
}
export const factory = modelFactory((options: FactoryOptions) => {
    const { filterFx } = options;
    const filterDeliveries = filterFx;
    return {
        filterDeliveries,
    };
});
