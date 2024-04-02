import { createGate } from 'effector-react';
import { createEvent, createStore, sample } from 'effector';
import { interval, once } from 'patronum';
import { widgetMarketModel } from '@/widgets/deliveries/market';
import { widgetMyDeliveriesModel } from '@/widgets/deliveries/myDeliveries';
import { getMyDeliveriesFx } from '@/entities/delivery';
import { POLLING_TIMEOUT } from '../config';

export const MarketPageGate = createGate<void>();

/**
 * Initial data fetching
 */
sample({
    clock: once({ source: MarketPageGate.open }),
    target: [widgetMarketModel.init, widgetMyDeliveriesModel.init],
});

/**
 * Data polling
 */
const { tick: makePageExpired } = interval({
    timeout: POLLING_TIMEOUT * 60 * 1000,
    start: once({ source: MarketPageGate.open }),
});

const updateContent = createEvent();
const $pageExpired = createStore<boolean>(false);

$pageExpired.on(makePageExpired, () => true);
$pageExpired.reset(updateContent);

sample({
    clock: once({
        source: MarketPageGate.open,
        reset: $pageExpired,
    }),
    source: $pageExpired,
    filter: (isExpired) => isExpired,
    target: updateContent,
});

/**
 * Update my deliveries page content
 */
const $lastUpdateContentTimestamp = createStore<number>(0).on(
    getMyDeliveriesFx.done,
    () => Date.now(),
);

sample({
    clock: updateContent,
    source: $lastUpdateContentTimestamp,
    filter: (lastUpdateTimestamp) =>
        Date.now() - lastUpdateTimestamp > POLLING_TIMEOUT * 60 * 1000,
    target: widgetMyDeliveriesModel.fetchData,
});

/**
 * Update market page content
 */
sample({
    clock: updateContent,
    target: widgetMarketModel.fetchData,
});
