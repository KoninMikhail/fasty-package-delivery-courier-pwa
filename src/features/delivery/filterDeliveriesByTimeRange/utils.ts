import { isBefore, isWithinInterval, parse } from 'date-fns';
import { Delivery } from '@/shared/api';

export function isTimeInRange(time: Date, range: string): boolean {
    const [rangeStart, rangeEnd] = range.split('-');

    const startTime = parse(rangeStart, 'HH:mm', time);
    const endTime = parse(rangeEnd, 'HH:mm', time);

    return isWithinInterval(time, { start: startTime, end: endTime });
}

export function filterAndSortDeliveries(
    deliveries: Delivery[],
    timeRanges: string[],
): Delivery[] {
    const filteredDeliveries = deliveries.filter((delivery) => {
        return timeRanges.some((range) =>
            isTimeInRange(delivery.time_end, range),
        );
    });

    filteredDeliveries.sort((a, b) => {
        const timeA = a.time_end;
        const timeB = b.time_end;
        return isBefore(timeA, timeB) ? -1 : 1;
    });

    return filteredDeliveries;
}
