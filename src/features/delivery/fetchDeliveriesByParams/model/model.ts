import { Model, modelFactory } from 'effector-factorio';
import { combine, createEvent, createStore, Effect, sample } from 'effector';
import type { Delivery } from '@/shared/api';
import { isAfter } from 'date-fns/isAfter';
import { pending, throttle } from 'patronum';
import { isEmpty } from '@/shared/lib/type-guards';
import { getCarValue, filterWeightValue } from '../lib';
import { MAX_WEIGHT_KG } from '../config';

export type DeliveryType = 'unset' | 'car' | 'foot';
export type WeightRange = [number, number];
type DatesRange = {
    dateFrom: string;
    toDate: string;
};

type GetAvailableDeliveriesByParameters = {
    fromDate?: string;
    toDate?: string;
    car?: boolean;
    express?: boolean;
    weightFrom?: number;
    weightTo?: number;
};

interface FactoryOptions {
    fetchDeliveriesFx: Effect<
        GetAvailableDeliveriesByParameters,
        Partial<Delivery>[]
    >;
    limit?: number;
}
export const factory = modelFactory((options: FactoryOptions) => {
    const fetch = createEvent();
    const expressChanged = createEvent<boolean>();
    const carChanged = createEvent<boolean>();
    const typeSelected = createEvent<Set<DeliveryType>>();
    const weightChanged = createEvent<WeightRange>();
    const weightChangedThrottled = throttle(weightChanged, 500);
    const pageChanged = createEvent<number>();
    const datesChanged = createEvent<Nullable<DatesRange>>();
    const parametersReset = createEvent();
    const errorsCleared = createEvent();

    /**
     * Data
     */
    const $fetchedDeliveries = createStore<Partial<Delivery>[]>([]).on(
        options.fetchDeliveriesFx.doneData,
        (_, payload) => payload,
    );

    /**
     * Params
     */
    const $type = createStore<Set<DeliveryType>>(new Set(['unset']))
        .on(typeSelected, (state, payload) => payload)
        .reset(parametersReset);
    const $express = createStore<Nullable<boolean>>(null)
        .on(expressChanged, (_, payload) => payload)
        .reset(parametersReset);
    const $car = createStore<boolean>(false)
        .on(carChanged, (_, payload) => payload)
        .reset(parametersReset);
    const $weight = createStore<WeightRange>([0, MAX_WEIGHT_KG])
        .on(weightChangedThrottled, (_, payload) => payload)
        .reset(parametersReset);
    const $datesRange = createStore<DatesRange>({
        dateFrom: '',
        toDate: '',
    })
        .on(datesChanged, (state, payload) => {
            if (!payload) return { ...state, dateFrom: '', toDate: '' };

            if (isAfter(payload.dateFrom, payload.toDate)) {
                return {
                    ...state,
                    dateFrom: payload.toDate,
                    toDate: payload.dateFrom,
                };
            }
            return {
                ...state,
                ...payload,
            };
        })
        .reset(parametersReset);

    // Pagination
    const $page = createStore<Nullable<number>>(null)
        .on(pageChanged, (_, payload) => payload)
        .reset(parametersReset);
    const $limit = createStore<Nullable<number>>(options.limit || null);

    const $selectedParameters = combine(
        $page,
        $limit,
        $type,
        $express,
        $car,
        $weight,
        $datesRange,
        (page, limit, type, express, car, weight, dates) => ({
            page: page ?? undefined,
            limit: limit ?? undefined,
            type: type ?? undefined,
            car: getCarValue(type),
            express: !!express || undefined,
            weight: weight ?? undefined,
            fromDate: dates.dateFrom,
            toDate: dates.toDate,
            weightMin: filterWeightValue(weight[0]),
            weightMax: filterWeightValue(weight[1], MAX_WEIGHT_KG),
        }),
    );

    /**
     * Handlers
     */
    sample({
        clock: [
            fetch,
            expressChanged,
            datesChanged,
            typeSelected,
            weightChangedThrottled,
            pageChanged,
            parametersReset,
        ],
        source: $selectedParameters,
        target: options.fetchDeliveriesFx,
    });

    /**
     * Errors
     */
    const $errors = createStore([]).reset(
        errorsCleared,
        options.fetchDeliveriesFx.done,
    );
    const $$hasErrors = $errors.map((errors) => errors.length > 0);

    /**
     * State
     */
    const $pending = pending([options.fetchDeliveriesFx]);
    const $$isEmpty = $fetchedDeliveries.map((deliveries) =>
        isEmpty(deliveries),
    );

    return {
        fetch,
        $fetchedDeliveries,
        $selectedParameters,
        $pending,
        pageChanged,
        datesChanged,
        $express,
        $type,
        $weight,
        expressPressed: expressChanged,
        typeSelected,
        weightChanged,
        filtersReset: parametersReset,
        $$isEmpty,
        $$hasErrors,
    };
});

export type FilterDeliveriesByParametersModel = Model<typeof factory>;
