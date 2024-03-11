import { combine, createEvent, createStore } from 'effector';
import { Model, modelFactory } from 'effector-factorio';
import { LatLngExpression, MapOptions } from 'leaflet';
import { debug } from 'patronum';

type MapFactoryOptions = {
    center: MapOptions['center'];
    zoom: MapOptions['zoom'];
    markers: LatLngExpression[];
};

export const mapFactory = modelFactory((options: MapFactoryOptions) => {
    const mapLoaded = createEvent();
    const map = createStore({}).on(mapLoaded, (_, data) => data);
    const centerChanged = createEvent<MapOptions['center']>();
    const addMarker = createEvent<LatLngExpression>();

    const $center = createStore<MapOptions['center']>(options.center).on(
        centerChanged,
        (_, center) => center,
    );
    const $zoom = createStore<MapOptions['zoom']>(options.zoom);
    const $markers = createStore<LatLngExpression[]>(options.markers).on(
        addMarker,
        (markers, marker) => [...markers, marker],
    );
    const $map = combine($center, $zoom, $markers, (center, zoom, markers) => ({
        center,
        zoom,
        markers,
    }));

    debug($center);

    return {
        mapLoaded,
        centerChanged,
        addMarker,
        map,
        $map,
    };
});

export type MapFactory = Model<typeof mapFactory>;
