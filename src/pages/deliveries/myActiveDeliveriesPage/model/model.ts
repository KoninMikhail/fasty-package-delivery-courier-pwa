import { createGate } from 'effector-react';
import { sample } from 'effector';
import { once } from 'patronum';
import { widgetMyDeliveriesModel } from '@/widgets/deliveries/myDeliveries';

const { initWidgetMyDeliveries } = widgetMyDeliveriesModel;

export const MyDeliveriesPageGate = createGate();

sample({
    clock: once(MyDeliveriesPageGate.open),
    target: [initWidgetMyDeliveries],
});
