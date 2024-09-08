import { createEvent, createStore } from 'effector';
import { HistoryDelivery } from '@/shared/api';
import { compareDesc, format, parseISO } from 'date-fns';

/**
 * All deliveries history
 */
export const setDeliveriesHistory = createEvent();
export const updateDeliveriesHistory = createEvent<HistoryDelivery[]>();
export const clearDeliveriesHistory = createEvent();

export const $fetchedData = createStore<HistoryDelivery[]>([])
    .on(setDeliveriesHistory, (_, payload) => payload)
    .on(updateDeliveriesHistory, (state, payload) => {
        const result = [...state];

        for (const payloadItem of payload) {
            const index = result.findIndex(
                (item1) => item1.id === payloadItem.id,
            );
            if (index === -1) {
                // Push the new object if no matching id is found
                result.push(payloadItem);
            } else {
                // Update the existing object if an item with the same id is found
                result[index] = { ...result[index], ...payloadItem };
            }
        }

        return result;
    })
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
