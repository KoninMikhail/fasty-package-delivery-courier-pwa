import { createGate } from 'effector-react';
import { createEvent, createStore, sample } from 'effector';
import { and, condition, delay, interval, not, once } from "patronum";
import { sessionModel , networkModel} from '@/entities/viewer';
import { widgetMyDeliveriesModel } from '@/widgets/deliveries/myDeliveries';
import { Logout } from '@/features/auth/logout';
import { RefreshToken } from '@/features/auth/refreshToken';
import { POLLING_TIMEOUT } from '../config';

/**
 * Externals
 */
const { $isAuthorized, resourcesLoaded } = sessionModel;
const {$$isOnline} = networkModel

/**
 * Gate for the page
 */

export const MyDeliveriesPageGate = createGate<void>();

/**
 * Initial data fetching
 */

const $isPageInitialized = createStore<boolean>(false)
    .on(
        once({
            source: MyDeliveriesPageGate.open,
            reset: Logout.model.userLoggedOut,
        }),
        () => true,
    )
    .reset(Logout.model.userLoggedOut);

sample({
    clock: $isPageInitialized,
    filter: (isInitialized) => isInitialized,
    target: resourcesLoaded,
});

/**
 * Widgets initialization
 */

const $initWidgetsCompleted = and(widgetMyDeliveriesModel.$isInitialized);

sample({
    clock: delay($isPageInitialized, 500),
    source: and(not(widgetMyDeliveriesModel.$isInitialized), $$isOnline),
    filter: (isInitialized) => !isInitialized,
    target: widgetMyDeliveriesModel.init,
});


/**
 * Data polling
 */
const pollingDataAllowed = createEvent();
const pollingDataForbidden = createEvent();

condition({
    source: $initWidgetsCompleted,
    if: and($$isOnline, $isAuthorized, $initWidgetsCompleted),
    then: pollingDataAllowed,
    else: pollingDataForbidden,
});

const { tick: makePageExpired } = interval({
    timeout: POLLING_TIMEOUT * 60 * 1000,
    start: pollingDataAllowed,
    stop: pollingDataForbidden,
});

const updateContent = createEvent();
const $pageExpired = createStore<boolean>(false)
    .on(makePageExpired, () => true)
    .reset(updateContent);

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
    widgetMyDeliveriesModel.dataUpdated,
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
 * Logout when user is not authorized
 */

sample({
    clock: RefreshToken.updateTokenFail,
    target: Logout.model.logout,
});
