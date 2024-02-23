import { ChipCheckBox } from '@/shared/ui/components';
import { HorizontalScroll } from '@/shared/ui/layouts';
import { CheckboxProps } from '@nextui-org/react';
import clsx from 'clsx';

/**
 * Constants
 */

const FILTER_CHECKBOXES_SIZE: CheckboxProps['size'] = 'lg';

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
    const filters = [
        { label: 'срочно', action: () => console.log('buenos-aires') },
        { label: 'тип доставки', action: () => console.log('sydney') },
        { label: 'промежуток', action: () => console.log('san-francisco') },
        { label: 'вес', action: () => console.log('san-francisco') },
    ];

    return (
        <HorizontalScroll>
            <div
                className={clsx(
                    'flex flex-nowrap gap-2',
                    withOutPadding && 'px-4',
                )}
            >
                {filters.map((filter) => (
                    <ChipCheckBox
                        size={FILTER_CHECKBOXES_SIZE}
                        key={filter.label}
                        onChange={filter.action}
                    >
                        {filter.label}
                    </ChipCheckBox>
                ))}
            </div>
        </HorizontalScroll>
    );
};
