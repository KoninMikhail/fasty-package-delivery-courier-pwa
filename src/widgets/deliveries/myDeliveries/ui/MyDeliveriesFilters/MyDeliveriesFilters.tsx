import { FilterDeliveriesByTimeRange } from '@/features/delivery/filterDeliveriesByTimeRange';
import { filteredDeliveriesByTimeModel } from '../../model';

export const MyDeliveriesFilters: FunctionComponent = () => {
    return (
        <div>
            <FilterDeliveriesByTimeRange.HorizontalTimePicker
                model={filteredDeliveriesByTimeModel}
                containerProps={{ className: 'px-4' }}
            />
        </div>
    );
};
