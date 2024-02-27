import { eachDayOfInterval, format, parse } from 'date-fns';
import { DayInfo } from '@/shared/ui/components/forms/horizontal-date-picker/parts/Day';

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
