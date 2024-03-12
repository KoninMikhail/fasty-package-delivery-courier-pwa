import { createEvent, createStore } from 'effector';
import { Model, modelFactory } from 'effector-factorio';
import { LatLngExpression, MapOptions } from 'leaflet';

export const singleLocationFactory = modelFactory(() => {
    const locationChanged = createEvent<MapOptions['center']>();

    const $location = createStore<Nullable<LatLngExpression>>(null).on(
        locationChanged,
        (_, payload) => payload,
    );

    return {
        locationChanged,
        $location,
    };
});

export type MapFactory = Model<typeof singleLocationFactory>;
