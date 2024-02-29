import { createEffect, createEvent, createStore, sample } from 'effector';
import { persist } from 'effector-storage/local';
import Cookies from 'js-cookie';
import { AppGate } from '@/shared/lib/app';
import { condition, debug } from "patronum";
import {
    apiClient,
    GetSubwayStationsListResponse,
    SubwayStation,
    subwayStationSchema,
} from '@/shared/api';
import { Done, Fail } from 'effector-storage';

/* eslint-disable unicorn/no-thenable */

const SUBWAY_STATIONS_LIST_EXPIRATION = 1; // 7 days
const SUBWAY_LOCAL_STORAGE_KEY = 'fasty-subway-stations-list';
const SUBWAY_COOKIE_KEY = 'fasty-subway-expire';

/**
 * Events
 */
export const initSubwayModel = createEvent();
const initComplete = createEvent();
const getFromLocalStorageComplete = createEvent<Done<unknown>>();
const getFromLocalStorageFail = createEvent<Fail<Error>>();

/**
 * Effects
 */
export const getSubwayStationsListFx = createEffect<
    void,
    GetSubwayStationsListResponse
>({
    handler: async () => {
        return apiClient.fetchSubwayStationsList();
    },
});

export const setExpireSubwayStationsListFx = createEffect({
    handler: async () => {
        Cookies.set(SUBWAY_COOKIE_KEY, 'true', {
            expires: SUBWAY_STATIONS_LIST_EXPIRATION,
        });
    },
});

export const revalidateSubwayExpireStationsListFx = createEffect<
    void,
    boolean,
    Error
>({
    handler: async () => {
        const actual = Cookies.get(SUBWAY_COOKIE_KEY);
        return !actual;
    },
});

/**
 * States
 */
export const $isInit = createStore(false).on(initComplete, () => true);
export const $error = createStore<Nullable<Error>>(null).reset(
    getSubwayStationsListFx.done,
);
export const $hasErrors = $error.map((error) => error !== null);

/**
 * Stores
 */
export const $subwayStationsList = createStore<SubwayStation[]>([]).on(
    getSubwayStationsListFx.doneData,
    (_, payload) => payload,
);
const $subwayStationsCacheExpired = createStore<Nullable<boolean>>(null)
    .on(revalidateSubwayExpireStationsListFx.doneData, (_, payload) => payload)
    .on(revalidateSubwayExpireStationsListFx.fail, () => true)
    .on(setExpireSubwayStationsListFx.done, () => false);

/**
 * local storage
 */
persist({
    store: $subwayStationsList,
    key: SUBWAY_LOCAL_STORAGE_KEY,
    contract: (raw): raw is SubwayStation[] => {
        const result = subwayStationSchema.array().safeParse(raw);
        if (!result.success) {
            throw result.error;
        } else {
            return true;
        }
    },
    done: getFromLocalStorageComplete,
    fail: getFromLocalStorageFail,
});

sample({
    clock: getFromLocalStorageComplete,
    target: initComplete,
});

sample({
    clock: getFromLocalStorageFail,
    target: getSubwayStationsListFx,
});

/**
 * Logic
 */
sample({
    source: initSubwayModel,
    target: revalidateSubwayExpireStationsListFx,
});

condition({
    source: $subwayStationsCacheExpired,
    if: (expired) => expired === null || expired === true,
    then: getSubwayStationsListFx,
    else: initComplete,
});

sample({
    clock: getSubwayStationsListFx.done,
    target: setExpireSubwayStationsListFx,
});

/**
 * Errors
 */
sample({
    clock: getSubwayStationsListFx.failData,
    target: $error,
});

sample({
    clock: AppGate.open,
    target: initSubwayModel,
});