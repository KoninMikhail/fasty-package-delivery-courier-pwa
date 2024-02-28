import {
    eachDayOfInterval,
    endOfMonth,
    format,
    getDate,
    getMonth,
    getYear,
    isEqual,
    parse,
} from 'date-fns';
import { DayInfo } from '@/shared/ui/components/forms/horizontal-date-picker/parts/Day';
import { DatePeriod } from './types';

export function parseDateInput(dateInput: string): Date {
    // Парсим дату из формата dd-MM-yyyy
    return parse(dateInput, 'dd-MM-yyyy', new Date());
}

export function generateDatesInRange(
    start: string,
    end: string,
): { month: string; year: number; days: DayInfo[] }[] {
    const startDate = parseDateInput(start);
    const endDate = parseDateInput(end);

    const dates = eachDayOfInterval({ start: startDate, end: endDate });
    const groupedByMonthYear = new Map<string, DayInfo[]>();

    for (const date of dates) {
        const monthYear = format(date, 'MMMM-yyyy');
        const dayInfo: Pick<DayInfo, 'date'> = {
            date,
        };

        if (groupedByMonthYear.has(monthYear)) {
            groupedByMonthYear.get(monthYear)?.push(dayInfo);
        } else {
            groupedByMonthYear.set(monthYear, [dayInfo]);
        }
    }

    const sortedMonths = [...groupedByMonthYear.keys()].sort((a, b) => {
        const dateA = parse(a, 'MMMM-yyyy', new Date());
        const dateB = parse(b, 'MMMM-yyyy', new Date());
        return dateA.getTime() - dateB.getTime();
    });

    return sortedMonths.map((monthYear) => {
        const [month, yearString] = monthYear.split('-');
        const year = Number.parseInt(yearString, 10);
        const days = groupedByMonthYear.get(monthYear) || [];
        return { month, year, days };
    });
}

/**
 * Checks if the given date is the last day of its month.
 * @param {Date} date A date to check.
 * @returns {boolean} True if `date` is the last day of its month, otherwise false.
 */
export function isLastDayOfSpecificMonth(date: Date): boolean {
    const lastDayOfMonth = endOfMonth(date);

    // Compare only year, month, and day parts of the date
    return (
        getYear(date) === getYear(lastDayOfMonth) &&
        getMonth(date) === getMonth(lastDayOfMonth) &&
        getDate(date) === getDate(lastDayOfMonth)
    );
}

export const generateDatesArray = ({
    dateStart,
    dateEnd,
}: Partial<DatePeriod>): string[] => {
    const startDate = parse(dateStart, 'dd-MM-yyyy', new Date());
    const endDate = parse(dateEnd, 'dd-MM-yyyy', new Date());

    const [start, end] =
        startDate > endDate ? [endDate, startDate] : [startDate, endDate];

    if (isEqual(start, end)) {
        return [format(start, 'dd-MM-yyyy')];
    }

    return eachDayOfInterval({ start, end }).map((date) =>
        format(date, 'dd-MM-yyyy'),
    );
};
