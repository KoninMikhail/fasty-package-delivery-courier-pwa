import { createGate } from 'effector-react';
import { sample } from 'effector';
import { once } from 'patronum';
import { widgetMyDeliveriesModel } from '@/widgets/deliveries/myDeliveries';
import { Route } from '@/entities/route';

const { initWidgetMyDeliveries } = widgetMyDeliveriesModel;

export const MyDeliveriesPageGate = createGate();

sample({
    clock: once(MyDeliveriesPageGate.open),
    target: [initWidgetMyDeliveries],
});

export const deliveriesMapModel = Route.Map.multiLocationFactory.createModel({
    center: {
        lat: 55.753_993_999_993_74,
        lng: 37.622_093_000_000_01,
    },
    zoom: 13,
});
