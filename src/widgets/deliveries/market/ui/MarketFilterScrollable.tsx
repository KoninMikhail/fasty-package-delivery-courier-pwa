import { ChipCheckBox } from '@/shared/ui/components';
import { HorizontalScroll } from '@/shared/ui/layouts';
import { CheckboxProps } from '@nextui-org/react';
import clsx from 'clsx';
import { IoIosTimer } from 'react-icons/io';

/**
 * Constants
 */

const FILTER_CHECKBOXES_SIZE: CheckboxProps['size'] = 'lg';

/**
 * Components
 */

const Express: FunctionComponent = () => {
    return (
        <ChipCheckBox
            size={FILTER_CHECKBOXES_SIZE}
            onChange={() => console.log('work')}
        >
            <span>
                <IoIosTimer /> срочно
            </span>
        </ChipCheckBox>
    );
};

const DeliveryType: FunctionComponent = () => {
    return (
        <ChipCheckBox
            size={FILTER_CHECKBOXES_SIZE}
            onChange={() => console.log('work')}
        >
            тип доставки
        </ChipCheckBox>
    );
};

const Period: FunctionComponent = () => {
    return (
        <ChipCheckBox
            size={FILTER_CHECKBOXES_SIZE}
            onChange={() => console.log('work')}
        >
            тип доставки
        </ChipCheckBox>
    );
};

const Weight: FunctionComponent = () => {
    return (
        <ChipCheckBox
            size={FILTER_CHECKBOXES_SIZE}
            onChange={() => console.log('work')}
        >
            вес
        </ChipCheckBox>
    );
};

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
        <HorizontalScroll>
            <div
                className={clsx(
                    'flex flex-nowrap gap-2',
                    withOutPadding && 'px-4',
                )}
            >
                <Express />
                <DeliveryType />
                <Period />
                <Weight />
            </div>
        </HorizontalScroll>
    );
};
