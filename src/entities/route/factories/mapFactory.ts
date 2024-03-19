import { createEvent, createStore, sample } from 'effector';
import { Model, modelFactory } from 'effector-factorio';
import { LatLngExpression, MapOptions } from 'leaflet';

interface FactoryOptions {
    defaultCenter: LatLngExpression;
    defaultZoom: MapOptions['zoom'];
    zoomWhenMarkerSelected: MapOptions['zoom'];
}

export const mapFactory = modelFactory(
    ({
        defaultCenter,
        defaultZoom,
        zoomWhenMarkerSelected,
    }: FactoryOptions) => {
        const locationChanged = createEvent<LatLngExpression>();
        const reset = createEvent();

        const setCenter = createEvent<LatLngExpression>();
        const $center = createStore<LatLngExpression>(defaultCenter)
            .on(setCenter, (_, payload) => payload)
            .reset(reset);

        const setMarkers = createEvent<LatLngExpression[]>();
        const $markers = createStore<LatLngExpression[]>([])
            .on(setMarkers, (_, payload) => payload)
            .reset(reset);

        const setZoom = createEvent<MapOptions['zoom']>();
        const $zoom = createStore<MapOptions['zoom']>(defaultZoom)
            .on(setZoom, (_, payload) => payload)
            .reset(reset);

        sample({
            clock: locationChanged,
            target: setCenter,
        });
        sample({
            clock: locationChanged,
            fn: (location) => [location],
            target: setMarkers,
        });
        sample({
            clock: locationChanged,
            fn: () => zoomWhenMarkerSelected,
            target: setZoom,
        });

        return {
            locationChanged,
            $markers,
            setManyMarkers: setMarkers,
            $center,
            setCenter,
            $zoom,
            setZoom,
        };
    },
);

export type MapFactory = Model<typeof mapFactory>;
