import { createGate } from 'effector-react';
import { sample } from 'effector';
import { once } from 'patronum';
import { widgetMyDeliveriesModel } from '@/widgets/deliveries/myDeliveries';
import { Route } from '@/entities/route';

const { initWidgetMyDeliveries, setOnline } = widgetMyDeliveriesModel;

export const MyDeliveriesPageGate = createGate<{
    online: boolean;
}>();

sample({
    clock: MyDeliveriesPageGate.open,
    fn: ({ online }) => online,
    target: setOnline,
});

sample({
    clock: once(MyDeliveriesPageGate.open),
    target: [initWidgetMyDeliveries],
});

export const deliveriesMapModel = Route.Map.factory.createModel({
    defaultCenter: {
        lat: 55.753_993_999_993_74,
        lng: 37.622_093_000_000_01,
    },
    defaultZoom: 13,
    zoomWhenMarkerSelected: 16,
});
