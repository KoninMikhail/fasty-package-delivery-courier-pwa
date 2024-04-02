import { Delivery } from '@/shared/api';
import { createEvent, createStore } from 'effector';
import { compareDesc, format, formatISO, parseISO, subDays } from 'date-fns';
import { InfiniteScroll } from '@/features/page/infinite-scroll';
import { getDeliveriesHistoryFx } from './effects';

export const init = createEvent();

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

/**
 * Infinite scroll model
 */

const today = new Date();
const amountOfDays = 7;

export const InfiniteScrollModel = InfiniteScroll.factory.createModel({
    initialPagination: {
        from: formatISO(subDays(today, amountOfDays), {
            representation: 'date',
        }),
        to: formatISO(today, { representation: 'date' }),
    },
    paginationOnLoadNewPage: (store) => {
        return {
            from: formatISO(subDays(parseISO(store.from), amountOfDays), {
                representation: 'date',
            }),
            to: formatISO(subDays(parseISO(store.to), amountOfDays), {
                representation: 'date',
            }),
        };
    },
    stopOn: (payload) => payload.length === 0,
    requestContentFx: getDeliveriesHistoryFx,
});
