import { createEvent, createStore, sample } from 'effector';
import { persist } from 'effector-storage/local';
import { getSubwayStationsListFx, setSubwayStations } from '@/entities/route';
import { z } from 'zod';
import { isAfter, subDays } from 'date-fns';
import { addError } from '@/shared/errors';
import { throttle } from 'patronum';
import { SUBWAY_COOKIE_KEY, SUBWAY_STATIONS_LIST_EXPIRATION } from './config';

export const check = createEvent();
export const done = createEvent();
export const fail = createEvent();

/**
 * Storage
 */
const $lastUpdateDate = createStore<Optional<Date>>(null).on(
    done,
    () => new Date(),
);

persist({
    store: $lastUpdateDate,
    key: SUBWAY_COOKIE_KEY,
    contract: (raw): raw is Date => {
        try {
            z.coerce.date().parse(raw);
            return true;
        } catch {
            return false;
        }
    },
});

/**
 * Update
 */
export const $$isRequireUpdate = $lastUpdateDate.map((date) => {
    if (!date) return true;
    return isAfter(subDays(new Date(), SUBWAY_STATIONS_LIST_EXPIRATION), date);
});

sample({
    clock: throttle(check, 5000),
    source: $$isRequireUpdate,
    filter: (isRequire) => !!isRequire,
    target: getSubwayStationsListFx,
});

/**
 * When update complete
 */
sample({
    clock: getSubwayStationsListFx.doneData,
    target: [done, setSubwayStations],
});

/**
 * Errors
 */
sample({
    clock: getSubwayStationsListFx.failData,
    target: [fail, addError],
});
