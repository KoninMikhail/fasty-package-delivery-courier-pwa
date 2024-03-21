import { createGate } from 'effector-react';
import { createStore, sample } from 'effector';
import { once } from 'patronum';
import { widgetMarketModel } from '@/widgets/deliveries/market';
import { widgetMyDeliveriesModel } from '@/widgets/deliveries/myDeliveries';

export const MarketPageGate = createGate<void>();

export const initializeMarketPage = createStore(false).on(
    MarketPageGate.open,
    () => true,
);

/**
 * First initialization of the market and my deliveries widgets
 */
sample({
    clock: once({ source: MarketPageGate.open }),
    target: [
        widgetMarketModel.initMarket,
        widgetMyDeliveriesModel.initWidgetMyDeliveries,
    ],
});
