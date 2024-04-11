import { Delivery } from '@/shared/api';
import { combine, createStore } from 'effector';
import { getMyDeliveriesFx, setDeliveryStatus } from '@/entities/delivery';
import { assignUserToDeliveryFx } from '@/entities/user';
import { authByEmailFx, logoutFx, settingsModel } from '@/entities/viewer';
import { compareAsc, parse } from 'date-fns';

const updateDeliveryStatus = (
    deliveries: Delivery[],
    updatedDelivery: Delivery,
): Delivery[] => {
    const shouldRemove = ['done', 'canceled'].includes(updatedDelivery.states);
    if (shouldRemove) {
        return deliveries.filter(
            (delivery) => delivery.id !== updatedDelivery.id,
        );
    }
    const index = deliveries.findIndex(
        (delivery) => delivery.id === updatedDelivery.id,
    );
    if (index !== -1) {
        const updatedDeliveries = [...deliveries];
        updatedDeliveries[index] = updatedDelivery;
        return updatedDeliveries;
    }
    return [...deliveries, updatedDelivery];
};

/**
 * Storage
 */
export const $deliveriesStore = createStore<Delivery[]>([])
    .on(getMyDeliveriesFx.doneData, (_, deliveries) => deliveries)
    .on(setDeliveryStatus.doneData, (state, payload) =>
        updateDeliveryStatus(state, payload),
    )
    .on(assignUserToDeliveryFx.doneData, (state, payload) =>
        updateDeliveryStatus(state, payload),
    )
    .reset([authByEmailFx.done, logoutFx.done, logoutFx.fail]);

export const $$upcomingDeliveries = combine(
    $deliveriesStore,
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
            .filter((delivery) => delivery.states === 'delivering')
            .slice(0, count);
    },
);
