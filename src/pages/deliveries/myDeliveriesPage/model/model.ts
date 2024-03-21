import { createGate } from 'effector-react';
import { sample } from 'effector';
import { once } from 'patronum';
import { widgetMyDeliveriesModel } from '@/widgets/deliveries/myDeliveries';

export const MyDeliveriesPageGate = createGate<void>();

sample({
    clock: once({ source: MyDeliveriesPageGate.open }),
    target: [widgetMyDeliveriesModel.initWidgetMyDeliveries],
});
