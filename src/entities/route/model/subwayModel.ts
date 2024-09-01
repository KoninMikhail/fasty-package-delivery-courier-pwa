import { createEvent, createStore, sample } from 'effector';
import { persist } from 'effector-storage/local';
import { Fail } from 'effector-storage';
import { SubwayStation, subwayStationSchema } from '@/shared/api';
import { addError, ERROR_CODES } from '@/shared/errors';
import { ValidationError } from '@/shared/errors/errors';
import { SUBWAY_LOCAL_STORAGE_KEY } from '../config/storage';

/**
 * Event triggered when fetching from local storage fails.
 * @event
 */
const getFromLocalStorageFail = createEvent<Fail<Error>>();

/**
 * Event to set the list of subway stations.
 * @event
 */
export const setSubwayStations = createEvent<SubwayStation[]>();

/**
 * Store to hold the list of subway stations.
 * @store
 */
export const $subwayStationsList = createStore<SubwayStation[]>([]).on(
    setSubwayStations,
    (_, stations) => stations,
);

/**
 * Persist the subway stations list to local storage.
 * @persist
 */
persist({
    store: $subwayStationsList,
    key: SUBWAY_LOCAL_STORAGE_KEY,
    contract: (raw): raw is SubwayStation[] => {
        const result = subwayStationSchema.array().safeParse(raw);
        if (result.success) {
            return true;
        }
        throw result.error;
    },
    fail: getFromLocalStorageFail,
});

/**
 * Sample to trigger ValidationError and addError events when fetching from local storage fails.
 * @sample
 */
sample({
    clock: getFromLocalStorageFail,
    fn: () => new ValidationError(ERROR_CODES.SUBWAY_PERSIST_FAILED),
    target: addError,
});
