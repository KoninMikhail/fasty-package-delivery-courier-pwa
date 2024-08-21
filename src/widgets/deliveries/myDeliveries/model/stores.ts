import { combine, createEvent, createStore } from 'effector';
import { Delivery, MyDelivery } from '@/shared/api';
import { settingsModel } from '@/entities/viewer';
import { compareAsc, parse } from 'date-fns';
import { persist } from 'effector-storage/local';
import { LOCAL_STORAGE_CACHE_KEY } from '../config';

/**
 * Deliveries store
 */
export const setDeliveries = createEvent<MyDelivery[]>();
export const resetDeliveries = createEvent();
export const updateDelivery = createEvent<Partial<MyDelivery>>();
export const updateDeliveryState = createEvent<{
    id: Delivery['id'];
    comment: string;
    state: Delivery['state'];
}>();

export const $myDeliveriesStore = createStore<MyDelivery[]>([])
    .on(setDeliveries, (_, deliveries) => deliveries)
    .reset(resetDeliveries);
/*
    .reset([authByEmailFx.done, logoutFx.done, logoutFx.fail]); */

persist({
    store: $myDeliveriesStore,
    key: LOCAL_STORAGE_CACHE_KEY,
    contract: (raw): raw is MyDelivery[] => {
        return Array.isArray(raw) && raw.every((item) => item.id);
    },
});

export const $$upcomingPickups = combine(
    $myDeliveriesStore,
    settingsModel.$homeUpcomingDeliveriesCount,
    (deliveries, count) => {
        return deliveries
            .sort((a, b) => {
                const dateComparison = compareAsc(
                    new Date(a.date),
                    new Date(b.date),
                );
                if (dateComparison === 0) {
                    const template = 'yyyy-MM-dd HH:mm:ss';
                    const aTime = parse(
                        `${a.date} ${a.time_end}`,
                        template,
                        new Date(),
                    );
                    const bTime = parse(
                        `${b.date} ${b.time_end}`,
                        template,
                        new Date(),
                    );
                    return compareAsc(aTime, bTime);
                }
                return dateComparison;
            })
            .filter((delivery) => delivery.state === 'delivering')
            .slice(0, count);
    },
);

/**
 * Map markers
 */

export const $$deliveriesMarkers = $myDeliveriesStore.map((deliveries) => {
    return deliveries.map((delivery) => {
        const lat = delivery?.address?.latitude;
        const lng = delivery?.address?.longitude;

        if (lat && lng) {
            return { lat, lng };
        }
        return null;
    });
});
