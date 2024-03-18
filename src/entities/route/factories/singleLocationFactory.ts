import { createEvent, createStore } from 'effector';
import { Model, modelFactory } from 'effector-factorio';
import { LatLngExpression, MapOptions } from 'leaflet';
import { debug } from 'patronum';

const DEFAULT_CENTER: LatLngExpression = {
    lat: 55.753_025_906_384_16,
    lng: 37.620_334_238_617_83,
};

interface FactoryOptions {
    center: LatLngExpression;
    zoom: MapOptions['zoom'];
}

export const singleLocationFactory = modelFactory(
    ({ center }: FactoryOptions) => {
        const locationChanged = createEvent<LatLngExpression>();
        const resetLocations = createEvent();

        const $center = createStore<LatLngExpression>(
            center || DEFAULT_CENTER,
        ).on(locationChanged, (_, payload) => payload);

        const $locations = createStore<LatLngExpression[]>([])
            .on(locationChanged, (_, payload) => [payload])
            .reset(resetLocations);
        debug(locationChanged);
        return {
            locationChanged,
            $locations,
            $center,
        };
    },
);

export type MapFactory = Model<typeof singleLocationFactory>;
