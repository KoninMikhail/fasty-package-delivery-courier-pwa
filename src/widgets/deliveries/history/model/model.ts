import { Delivery } from '@/shared/api';
import { createEvent, sample } from 'effector';
import { compareDesc, format, parseISO } from 'date-fns';
import { InfiniteScroll } from 'features/other/infinite-scroll';
import { sharedLibTypeGuards } from '@/shared/lib';
import { FetchDeliveriesByParameters } from '@/features/delivery/fetchDeliveriesByParams';
import { debug } from 'patronum';
import { getDeliveriesHistoryFx } from './effects';

const { isEmpty } = sharedLibTypeGuards;

/**
 * Providers
 */

const fetchDeliveriesHistoryModel =
    FetchDeliveriesByParameters.factory.createModel({
        fetchDeliveriesFx: getDeliveriesHistoryFx,
    });

export const init = createEvent();

sample({
    clock: init,
    target: fetchDeliveriesHistoryModel.fetch,
});

debug(fetchDeliveriesHistoryModel.$fetchedDeliveries);

// Store the fetched deliveries
/* export const $fetchedData = createStore<Set<Delivery>>(new Set(), {
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
}); */

/**
 * Store the sorted deliveries history
 */
export const $sortedDeliveriesHistory =
    fetchDeliveriesHistoryModel.$fetchedDeliveries.map((deliveriesSet) => {
        const deliveries = [...deliveriesSet];
        const groupedByDate: Record<string, Delivery[]> = {};

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

/**
 * Infinite scroll model
 */

export const InfiniteScrollModel = InfiniteScroll.factory.createModel({
    initialPagination: {
        page: 0,
    },
    paginationOnLoadNewPage: (query) => {
        return {
            page: query.page + 1,
        };
    },
    stopOn: (payload) => isEmpty(payload),
    provider: getDeliveriesHistoryFx,
});

debug(InfiniteScrollModel.newPageRequested);
