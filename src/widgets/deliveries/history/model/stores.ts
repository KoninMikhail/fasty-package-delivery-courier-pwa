import { createEvent, createStore } from 'effector';
import { HistoryDelivery } from '@/shared/api';
import { compareDesc, format, parseISO } from 'date-fns';

/**
 * All deliveries history
 */
export const setDeliveriesHistory = createEvent();
export const clearDeliveriesHistory = createEvent();

export const $fetchedData = createStore<HistoryDelivery[]>([])
    .on(setDeliveriesHistory, (_, data) => data)
    .reset(clearDeliveriesHistory);

/**
 * Store the sorted deliveries history
 */
export const $$sortedDeliveriesHistory = $fetchedData.map((deliveriesSet) => {
    const deliveries = [...deliveriesSet];
    const groupedByDate: Record<string, HistoryDelivery[]> = {};

    for (const delivery of deliveries) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { updatedAt } = delivery;
        const updatedAtFormatted = format(updatedAt, 'yyyy-MM-dd');

        if (!groupedByDate[updatedAtFormatted])
            groupedByDate[updatedAtFormatted] = [];
        groupedByDate[updatedAtFormatted].push(delivery);
    }

    return Object.entries(groupedByDate)
        .map(([date, items]) => {
            return {
                date,
                count: items.length,
                canceled: items.filter((item) => item.state === 'canceled')
                    .length,
                items,
            };
        })
        .sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)));
});
