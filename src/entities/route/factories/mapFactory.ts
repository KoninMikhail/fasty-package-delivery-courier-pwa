import { createEvent, createStore } from 'effector';
import { Model, modelFactory } from 'effector-factorio';
import { LatLngExpression, MapOptions } from 'leaflet';

const DEFAULT_CENTER: LatLngExpression = {
    lat: 55.753_025_906_384_16,
    lng: 37.620_334_238_617_83,
};

interface FactoryOptions {
    center: LatLngExpression;
    zoom: MapOptions['zoom'];
}

export const mapFactory = modelFactory(({ center }: FactoryOptions) => {
    const centerChanged = createEvent<MapOptions['center']>();
    const addLocation = createEvent<LatLngExpression>();
    const removeLocation = createEvent<LatLngExpression>();
    const resetLocations = createEvent();

    const $center = createStore<LatLngExpression>(center || DEFAULT_CENTER).on(
        centerChanged,
        (_, payload) => payload,
    );

    const $locations = createStore<LatLngExpression[]>([])
        .on(addLocation, (state, payload) => [...state, payload])
        .on(removeLocation, (state, payload) =>
            state.filter((location) => location !== payload),
        )
        .reset(resetLocations);

    return {
        locationChanged: centerChanged,
        addLocation,
        $locations,
        $center,
    };
});

export type MapFactory = Model<typeof mapFactory>;
