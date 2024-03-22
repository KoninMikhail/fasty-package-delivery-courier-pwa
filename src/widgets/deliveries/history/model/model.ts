import { Delivery } from '@/shared/api';
import { createStore } from 'effector';
import { compareDesc, format, formatISO, parseISO, subDays } from 'date-fns';
import { InfiniteScroll } from '@/features/page/infinite-scroll';
import { debug } from 'patronum';
import { getDeliveriesHistoryFx } from './effects';

// Initial date range for the history
const today = new Date();
const initialDateFrom = formatISO(subDays(today, 10), {
    representation: 'date',
});
const initialDateTo = formatISO(today, { representation: 'date' });

debug(getDeliveriesHistoryFx.done);

// Store the fetched deliveries
export const $fetchedData = createStore<Set<Delivery>>(new Set(), {
    name: 'fetchedDeliveries',
}).on(getDeliveriesHistoryFx.doneData, (currentState, payload) => {
    // Create a new set to merge current items and new items
    const updatedSet = new Set(currentState);

    for (const newDelivery of payload) {
        const existingDelivery = [...updatedSet].find(
            (delivery) => delivery.id === newDelivery.id,
        );
        if (existingDelivery) {
            // Optionally update an existing delivery
            updatedSet.delete(existingDelivery);
            updatedSet.add(newDelivery);
        } else {
            updatedSet.add(newDelivery);
        }
    }

    return updatedSet;
});

debug($fetchedData);

const $dateFrom = createStore<string>(initialDateFrom, { name: 'dateFrom' });
const $dateTo = createStore<string>(initialDateTo, { name: 'dateTo' });

/**
 * Store the sorted deliveries history
 */
export const $sortedDeliveriesHistory = $fetchedData.map((deliveriesSet) => {
    const deliveries = [...deliveriesSet];
    const groupedByDate: Record<string, Delivery[]> = {};

    for (const delivery of deliveries) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { updated_at } = delivery;
        const updatedAt = format(updated_at, 'yyyy-MM-dd');

        if (!groupedByDate[updatedAt]) groupedByDate[updatedAt] = [];
        groupedByDate[updatedAt].push(delivery);
    }

    return Object.entries(groupedByDate)
        .map(([date, items]) => {
            return {
                date,
                count: items.length,
                canceled: items.filter((item) => item.states === 'canceled')
                    .length,
                items,
            };
        })
        .sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)));
});

export const InfiniteScrollModel = InfiniteScroll.factory.createModel({
    requestContentFx: getDeliveriesHistoryFx,
});
