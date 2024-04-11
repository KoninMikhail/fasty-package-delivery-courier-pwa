import { HorizontalScroll } from '@/shared/ui/layouts';
import clsx from 'clsx';
import { FilterDeliveriesByParameters } from '@/features/delivery/filterDeliveriesByParams';
import { deliveriesFilterFeatureModel } from '../model';

/**
 * Components
 */

interface MarketFilterScrollableProperties {
    withOutPadding?: boolean;
}

/**
 * @name DeliveriesMarketContent
 * @description widget for display available deliveries
 * @constructor
 */
export const MarketFilterScrollable: FunctionComponent<
    MarketFilterScrollableProperties
> = ({ withOutPadding }) => {
    return (
        <div className="flex gap-4">
            <HorizontalScroll>
                <div
                    className={clsx(
                        'flex flex-nowrap gap-2',
                        withOutPadding && 'px-4',
                    )}
                >
                    <FilterDeliveriesByParameters.ExpressSelector
                        model={deliveriesFilterFeatureModel}
                        size="sm"
                        className="w-24 rounded-full"
                    />
                    <FilterDeliveriesByParameters.TypeSelector
                        model={deliveriesFilterFeatureModel}
                        size="sm"
                        className="rounded-full"
                    />
                    <FilterDeliveriesByParameters.WeightSelector
                        model={deliveriesFilterFeatureModel}
                    />
                </div>
            </HorizontalScroll>
        </div>
    );
};
