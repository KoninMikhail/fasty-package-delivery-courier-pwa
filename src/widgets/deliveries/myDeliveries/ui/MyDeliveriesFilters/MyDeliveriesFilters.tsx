import { FilterDeliveriesByTimeRange } from '@/features/delivery/filterDeliveriesByTimeRange';
import { filteredDeliveriesByTimeModel } from '../../model/model';

export const MyDeliveriesFilters: FunctionComponent = () => {
    return (
        <div>
            <FilterDeliveriesByTimeRange.HorizontalTimePicker
                model={filteredDeliveriesByTimeModel}
                containerProps={{ className: 'px-4 lg:px-0 gap-2' }}
            />
        </div>
    );
};
