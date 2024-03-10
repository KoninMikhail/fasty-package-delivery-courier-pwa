import { createGate } from 'effector-react';
import { sample } from 'effector';
import { initHistoryDeliveryWidget } from '@/widgets/deliveries/history/init';
import { debug } from 'patronum';

export const MyDeliveriesHistoryPageGate = createGate();

sample({
    clock: MyDeliveriesHistoryPageGate.open,
    target: initHistoryDeliveryWidget,
});

debug(MyDeliveriesHistoryPageGate.open);
