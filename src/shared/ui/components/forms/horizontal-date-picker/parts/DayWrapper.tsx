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
    isSelectedDay,
    singleDay,
}) => {
    const outputStyles = clsx(
        'relative w-12 h-16 after:absolute after:h-full after:top-0 after:right-0',
        {
            'rounded-l-2xl': !singleDay && firstDayOfSelect,
            'rounded-r-2xl': !singleDay && lastDayOfSelect,
            'after:bg-content2 bg-content2':
                !singleDay && isSelectedDay && !lastDayOfSelect,
            '!w-10 mr-2 bg-content2 pr-0': lastDayOfSelect,
        },
    );

    return <div className={outputStyles}>{children}</div>;
};
