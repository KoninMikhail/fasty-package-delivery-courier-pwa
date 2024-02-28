import { HorizontalScroll } from '@/shared/ui/layouts';
import { CheckboxProps } from '@nextui-org/react';
import clsx from 'clsx';
import { PropsWithChildren, useState } from 'react';
import { HorizontalDatePicker } from '@/shared/ui/components';
import { DatePeriod } from '@/shared/ui/components/forms/horizontal-date-picker/types';

/**
 * Constants
 */

const FILTER_CHECKBOXES_SIZE: CheckboxProps['size'] = 'lg';

interface MarketFilterScrollableProperties {
    withOutPadding?: boolean;
}

const MonthWrapper: FunctionComponent<
    PropsWithChildren & {
        month: string;
    }
> = ({ children, month }) => {
    return (
        <div className="relative">
            <span className="sticky left-0 pl-4 text-xs uppercase text-content4">
                {month}
            </span>
            <div className="flex flex-nowrap gap-4 pl-4">{children}</div>
        </div>
    );
};

const CalendarItem: FunctionComponent<{
    numberOfDay: string;
    weekDay: string;
    isWeekend?: boolean;
    isSelected?: boolean;
    isStartOfPeriod?: boolean;
    isEndOfPeriod?: boolean;
}> = ({ numberOfDay, weekDay, isWeekend, isSelected }) => {
    return (
        <div
            className={clsx(
                'rounded-3xl p-2 px-3 text-center',
                isSelected && 'bg-gray-200',
            )}
        >
            <div className="text-xl font-bold">{numberOfDay}</div>
            <div
                className={clsx(
                    'text-sm font-light',
                    isWeekend && 'text-red-600',
                )}
            >
                {weekDay}
            </div>
        </div>
    );
};

/**
 * @name DeliveriesMarketContent
 * @description widget for display available deliveries
 * @constructor
 */
export const MarketDateSelector: FunctionComponent<
    MarketFilterScrollableProperties
> = ({ withOutPadding }) => {
    const [selectedDates, setSelectedDates] = useState<DatePeriod>();

    const onChangeDate = (work: DatePeriod) => {
        setSelectedDates(() => work);
    };

    return (
        <HorizontalScroll>
            <HorizontalDatePicker
                selectedDates={selectedDates}
                onChangeDate={onChangeDate}
            />
        </HorizontalScroll>
    );
};
