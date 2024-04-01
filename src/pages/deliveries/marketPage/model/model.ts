import { createEvent, sample } from 'effector';
import { once } from 'patronum';
import { widgetMarketModel } from '@/widgets/deliveries/market';
import { widgetMyDeliveriesModel } from '@/widgets/deliveries/myDeliveries';
import { sharedLibApp } from '@/shared/lib';
import { createGate } from "effector-react";

export const MarketPageGate = createGate()

/**
 * First initialization of the market and my deliveries widgets
 */
sample({
    clock: once(MarketPageGate.open),
    target: [
        widgetMarketModel.initMarket,
        widgetMyDeliveriesModel.initWidgetMyDeliveries,
    ],
});
