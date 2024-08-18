import { createEvent, createStore, sample } from 'effector';
import { compareDesc, format, parseISO } from 'date-fns';
import { InfiniteScroll } from 'features/other/infinite-scroll';
import { FetchDeliveriesByParameters } from '@/features/delivery/fetchDeliveriesByParams';
import { delay } from 'patronum';
import { HistoryDelivery } from '@/shared/api';
import { getDeliveriesHistoryFx } from './effects';

/**
 * Features
 */
export const InfiniteScrollModel = InfiniteScroll.factory.createModel({
    provider: getDeliveriesHistoryFx,
    throttleTimeoutInMs: 500,
    initial: {
        page: 1,
    },
    onTriggerNewPage: (query) => {
        return {
            page: query.page + 1,
        };
    },
});

const fetchDeliveriesHistoryModel =
    FetchDeliveriesByParameters.factory.createModel({
        provider: getDeliveriesHistoryFx,
        pagination: InfiniteScrollModel.$pagination,
    });

/**
 * Events
 */
export const init = createEvent();

/**
 * Initialize the model
 */
export const $isInitialized = createStore(false);

sample({
    clock: init,
    target: fetchDeliveriesHistoryModel.fetch,
});

sample({
    clock: delay(fetchDeliveriesHistoryModel.deliveriesFetched, 200),
    fn: () => true,
    target: $isInitialized,
});

/**
 * Data
 */

const $fetchedData = createStore<HistoryDelivery[]>([]);

sample({
    clock: fetchDeliveriesHistoryModel.deliveriesFetched,
    source: $fetchedData,
    fn: (previous, next) => [...previous, ...next],
    target: $fetchedData,
});

/**
 * Store the sorted deliveries history
 */
export const $sortedDeliveriesHistory = $fetchedData.map((deliveriesSet) => {
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
