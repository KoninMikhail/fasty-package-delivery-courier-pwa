import { ReactNode } from 'react';
import clsx from 'clsx';

export const DayWrapper: FunctionComponent<{
    firstDayOfSelect?: boolean;
    lastDayOfSelect?: boolean;
    isLastMonthDay?: boolean;
    isSelectedDay?: boolean;
    singleDay?: boolean;
    children: ReactNode;
}> = ({
    children,
    firstDayOfSelect,
    lastDayOfSelect,
    isLastMonthDay,
    isSelectedDay,
    singleDay,
}) => {
    const outputStyles = clsx(
        'relative min-w-12 h-16 after:absolute after:h-full after:top-0 after:right-0',
        isLastMonthDay ? 'pr-6 after:w-6' : 'after:w-2 pr-1',
        {
            'rounded-l-2xl': !singleDay && firstDayOfSelect,
            'rounded-r-2xl': !singleDay && lastDayOfSelect,
            'after:bg-gray-100 bg-gray-100':
                !singleDay && isSelectedDay && !lastDayOfSelect,
            'bg-gray-100 pr-0': lastDayOfSelect,
        },
    );

    return <div className={outputStyles}>{children}</div>;
};
