import { createEvent, sample } from 'effector';
import { getDeliveriesHistoryFx } from '@/widgets/deliveries/history/api';

export const initHistoryDeliveryWidget = createEvent();

sample({
    clock: initHistoryDeliveryWidget,
    target: getDeliveriesHistoryFx,
});
