import { isWithinInterval, parse } from 'date-fns';
import { Delivery } from '@/shared/api';

export function isTimeInRange(time: string, range: string): boolean {
    const [rangeStart, rangeEnd] = range.split('-');
    const date = new Date(); // используем текущую дату как базу для времени

    const startTime = parse(rangeStart, 'HH:mm', date);
    const endTime = parse(rangeEnd, 'HH:mm', date);
    const currentTime = parse(time, 'HH:mm', date);

    return isWithinInterval(currentTime, { start: startTime, end: endTime });
}

export function filterAndSortDeliveries(
    deliveries: Delivery[],
    timeRanges: string[],
): Delivery[] {
    const filteredDeliveries = deliveries.filter((delivery) =>
        timeRanges.some((range) => isTimeInRange(delivery.time_end, range)),
    );

    filteredDeliveries.sort((a, b) => {
        const timeA = parse(a.time_end, 'HH:mm', new Date());
        const timeB = parse(b.time_end, 'HH:mm', new Date());
        return timeA.getTime() - timeB.getTime();
    });

    return filteredDeliveries;
}
