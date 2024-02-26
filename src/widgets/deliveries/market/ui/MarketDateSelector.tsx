import { HorizontalScroll } from '@/shared/ui/layouts';
import { Button, CheckboxProps } from '@nextui-org/react';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';

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
    return (
        <HorizontalScroll>
            <MonthWrapper month="Zнварь">
                <CalendarItem weekDay="пн" numberOfDay="1" isSelected />
                <CalendarItem weekDay="вт" numberOfDay="2" />
                <CalendarItem weekDay="ср" numberOfDay="3" />
                <CalendarItem weekDay="чт" numberOfDay="4" />
                <CalendarItem weekDay="пт" numberOfDay="5" isSelected />
                <CalendarItem weekDay="сб" numberOfDay="6" isWeekend />
                <CalendarItem weekDay="вс" numberOfDay="7" isWeekend />
                <CalendarItem weekDay="пн" numberOfDay="8" />
                <CalendarItem weekDay="вт" numberOfDay="9" />
                <CalendarItem weekDay="ср" numberOfDay="10" />
                <CalendarItem weekDay="чт" numberOfDay="11" />
                <CalendarItem weekDay="пт" numberOfDay="12" />
                <CalendarItem weekDay="сб" numberOfDay="13" />
                <CalendarItem weekDay="вс" numberOfDay="14" />
                <CalendarItem weekDay="пн" numberOfDay="15" />
                <CalendarItem weekDay="вт" numberOfDay="16" />
            </MonthWrapper>
            <MonthWrapper month="Zнварь">
                <CalendarItem weekDay="пн" numberOfDay="1" />
                <CalendarItem weekDay="вт" numberOfDay="2" />
                <CalendarItem weekDay="ср" numberOfDay="3" />
                <CalendarItem weekDay="чт" numberOfDay="4" />
                <CalendarItem weekDay="пт" numberOfDay="5" />
                <CalendarItem weekDay="сб" numberOfDay="6" isWeekend />
                <CalendarItem weekDay="вс" numberOfDay="7" isWeekend />
                <CalendarItem weekDay="пн" numberOfDay="8" />
                <CalendarItem weekDay="вт" numberOfDay="9" />
                <CalendarItem weekDay="ср" numberOfDay="10" />
                <CalendarItem weekDay="чт" numberOfDay="11" />
                <CalendarItem weekDay="пт" numberOfDay="12" />
                <CalendarItem weekDay="сб" numberOfDay="13" />
                <CalendarItem weekDay="вс" numberOfDay="14" />
                <CalendarItem weekDay="пн" numberOfDay="15" />
                <CalendarItem weekDay="вт" numberOfDay="16" />
            </MonthWrapper>
            <div className="flex flex-nowrap items-end gap-4">
                <Button>Кнопка</Button>
            </div>
        </HorizontalScroll>
    );
};
