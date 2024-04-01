import { createGate } from 'effector-react';
import { MyDeliveriesPageGate } from '@/pages/deliveries/myDeliveriesPage/model/model';
import { sample } from 'effector';
import { once } from 'patronum';
import { widgetMyDeliveriesModel } from '@/widgets/deliveries/myDeliveries';

export const MyDeliveriesHistoryPageGate = createGate<void>();

sample({
    clock: once({ source: MyDeliveriesPageGate.open }),
    target: [widgetMyDeliveriesModel.initWidgetMyDeliveries],
});
