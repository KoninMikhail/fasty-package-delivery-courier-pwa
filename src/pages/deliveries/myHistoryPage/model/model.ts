import { createGate } from 'effector-react';

export const MyDeliveriesHistoryPageGate = createGate<void>();
/*

sample({
    clock: once({ source: MyDeliveriesPageGate.open }),
    target: [widgetMyDeliveriesModel.initWidgetMyDeliveries],
});
*/
