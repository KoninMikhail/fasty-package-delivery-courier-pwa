import { createGate } from 'effector-react';
import { createEvent, createStore, sample } from 'effector';
import { and, debug, interval, once } from 'patronum';
import { sessionModel } from '@/entities/viewer';
import { widgetMyDeliveriesModel } from '@/widgets/deliveries/myDeliveries';
import { getMyDeliveriesFx } from '@/entities/delivery';
import { POLLING_TIMEOUT } from '../config';

export const MyDeliveriesPageGate = createGate<void>();

const canStartPollingData = createEvent();

/**
 * Initial data fetching
 */

const $pageLoaded = createStore<boolean>(false).on(
    MyDeliveriesPageGate.open,
    () => true,
);

const $$readyForInit = and(
    sessionModel.$isAuthorized,
    sessionModel.$$isOnline,
    $pageLoaded,
);

sample({
    clock: $$readyForInit,
    target: [widgetMyDeliveriesModel.init, canStartPollingData],
});

/**
 * Data polling
 */
const { tick: makePageExpired } = interval({
    timeout: POLLING_TIMEOUT * 60 * 1000,
    start: once({ source: MyDeliveriesPageGate.open }),
});

const updateContent = createEvent();
const $pageExpired = createStore<boolean>(false);

$pageExpired.on(makePageExpired, () => true);
$pageExpired.reset(updateContent);

sample({
    clock: once({
        source: MyDeliveriesPageGate.open,
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
debug(getMyDeliveriesFx.done);
