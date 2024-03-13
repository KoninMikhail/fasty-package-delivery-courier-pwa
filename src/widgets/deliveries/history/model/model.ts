import { Delivery, DeliveryPagination } from '@/shared/api';
import { createStore } from 'effector';
import { compareDesc, parseISO } from 'date-fns';
import { InfiniteScroll } from '@/features/page/infinite-scroll';
import { debug } from 'patronum';
import { getDeliveriesHistoryFx } from './effects';

type SortedDeliveriesHistory = {
    date: string;
    count: number;
    canceled: number;
    items: Delivery[];
};

export const $fetchedDeliveriesHistory = createStore<
    Nullable<DeliveryPagination>
>(null).on(getDeliveriesHistoryFx.doneData, (state, payload) => payload);

debug($fetchedDeliveriesHistory);

export const $sortedDeliveriesHistory = $fetchedDeliveriesHistory.map(
    (pagination) => {
        const data = pagination?.data ?? [];
        const groupedByDate: Record<string, Delivery[]> = {};

        // Заполнение groupedByDate
        for (const delivery of data) {
            const dateString = delivery.date.split('T')[0];
            groupedByDate[dateString] ||= [];
            groupedByDate[dateString].push(delivery);
        }

        const sorted: SortedDeliveriesHistory[] = Object.entries(groupedByDate)
            .map(([date, items]) => ({
                date,
                count: items.length,
                canceled: items.filter((item) => item.states === 'canceled')
                    .length,
                items,
            }))
            .sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)));

        return sorted;
    },
);

export const InfiniteScrollModel = InfiniteScroll.factory.createModel({
    requestContentFx: getDeliveriesHistoryFx,
});
