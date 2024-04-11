import { createGate } from 'effector-react';
import { sample } from 'effector';
import { once } from 'patronum';
import { widgetsDeliveriesHistoryModel } from '@/widgets/deliveries/history';

export const MyDeliveriesHistoryPageGate = createGate<void>();

sample({
    clock: once(MyDeliveriesHistoryPageGate.open),
    target: widgetsDeliveriesHistoryModel.init,
});
