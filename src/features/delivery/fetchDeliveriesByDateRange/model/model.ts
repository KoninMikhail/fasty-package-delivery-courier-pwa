import { Effect } from 'effector';
import { modelFactory } from 'effector-factorio';

interface FactoryOptions {
    fetchUpcomingDeliveriesFx: Effect<void, void>;
    fetchDeliveriesByDateRangeFx: Effect<void, void>;
    updateDeliveriesFx: Effect<void, void>;
}

export const factory = modelFactory((options: FactoryOptions) => {
    const { fetchUpcomingDeliveriesFx, fetchDeliveriesByDateRangeFx } = options;
    const fetchUpcomingDeliveries = fetchUpcomingDeliveriesFx;
    const fetchDeliveriesByDateRange = fetchDeliveriesByDateRangeFx;
    return {
        fetchUpcomingDeliveries,
        fetchDeliveriesByDateRange,
    };
});
