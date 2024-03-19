import { createGate } from 'effector-react';
import { createStore, sample } from 'effector';
import { once } from 'patronum';
import { widgetMarketModel } from '@/widgets/deliveries/market';

export const MarketPageGate = createGate<void>();

sample({
    clock: once({ source: MarketPageGate.open }),
    target: widgetMarketModel.initMarket,
});

export const $marketDataExpired = createStore(false);
export const $upcomingDeliveriesExpired = createStore<boolean>(false);
