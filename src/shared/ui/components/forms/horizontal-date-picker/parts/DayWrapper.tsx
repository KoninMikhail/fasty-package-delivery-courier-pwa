import { ReactNode } from 'react';

export const DayWrapper: FunctionComponent<{
    firstDayOfSelect?: boolean;
    lastDayOfSelect?: boolean;
    lastMonthDay?: boolean;
    selectedDay?: boolean;
    children: ReactNode;
}> = ({
    children,
    firstDayOfSelect,
    lastDayOfSelect,
    lastMonthDay,
    selectedDay,
}) => {
    if (firstDayOfSelect) {
        return (
            <div className="block rounded-l-2xl bg-gray-200">{children}</div>
        );
    }
    if (lastDayOfSelect) {
        return (
            <div className="block rounded-r-2xl bg-gray-200">{children}</div>
        );
    }
    if (lastMonthDay && !lastDayOfSelect) {
        return <div className="block bg-gray-200">{children}</div>;
    }

    if (selectedDay) {
        return <div className="block bg-gray-200">{children}</div>;
    }

    return <div className="block">{children}</div>;
};
