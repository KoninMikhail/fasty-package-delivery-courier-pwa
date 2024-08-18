import { createEvent, createStore, sample } from 'effector';
import { widgetMyDeliveriesModel } from '@/widgets/deliveries/myDeliveries';
import { and, interval, once } from 'patronum';
import { widgetMarketModel } from '@/widgets/deliveries/market';
import { getMyDeliveriesFx } from '@/entities/delivery';
import { createGate } from 'effector-react';
import { widgetTopbarModel } from '@/widgets/viewer/welcome-topbar';
import { sessionModel } from '@/entities/viewer';
import { POLLING_TIMEOUT_SEC } from '../config';

export const MarketPageGate = createGate<void>();
/**
 * Events
 */
const dataPollingAllowed = createEvent();

/**
 * First load
 */
const $isPageInitialized = createStore<boolean>(false).on(
    MarketPageGate.open,
    () => true,
);

const $$initWidgetsAllowed = and(
    sessionModel.$isAuthorized,
    $isPageInitialized,
);

sample({
    clock: $$initWidgetsAllowed,
    target: widgetTopbarModel.init,
});

sample({
    clock: $$initWidgetsAllowed,
    source: widgetMarketModel.$isInitialized,
    filter: (isInitialized, initAllowed) => initAllowed && !isInitialized,
    target: widgetMarketModel.init,
});

sample({
    clock: $$initWidgetsAllowed,
    filter: () => !widgetMyDeliveriesModel.$isInitialized,
    target: widgetMyDeliveriesModel.init,
});

const $$allWidgetsInitialized = and(
    widgetTopbarModel.$isInitialized,
    widgetMarketModel.$isInitialized,
    widgetMyDeliveriesModel.$isInitialized,
);

sample({
    clock: $$allWidgetsInitialized,
    filter: (isInitialized) => isInitialized,
    target: dataPollingAllowed,
});

/**
 * ============================
 * Data polling
 * ============================
 */
const newContentRequested = createEvent();

const { tick: pageContentMarkObsolete } = interval({
    timeout: POLLING_TIMEOUT_SEC * 1000,
    start: dataPollingAllowed,
});

const $isContentObsolete = createStore<boolean>(false)
    .on(pageContentMarkObsolete, () => true)
    .reset(newContentRequested);

const $lastUpdateContentTimestamp = createStore<number>(0).on(
    getMyDeliveriesFx.done,
    () => Date.now(),
);

sample({
    clock: once({
        source: MarketPageGate.open,
        reset: $isContentObsolete,
    }),
    source: {
        isExpired: $isContentObsolete,
        isOnline: sessionModel.$$isOnline,
    },
    filter: ({ isExpired, isOnline }) => isExpired && isOnline,
    target: newContentRequested,
});

/**
 * Update my deliveries
 */
sample({
    clock: newContentRequested,
    source: $lastUpdateContentTimestamp,
    filter: (lastUpdateTimestamp) =>
        Date.now() - lastUpdateTimestamp > POLLING_TIMEOUT_SEC * 60 * 1000,
    target: widgetMyDeliveriesModel.fetchData,
});

/**
 * Update market page content
 */
sample({
    clock: newContentRequested,
    target: widgetMarketModel.fetchData,
});
