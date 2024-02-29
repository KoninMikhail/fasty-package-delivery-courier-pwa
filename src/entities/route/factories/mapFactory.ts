import { combine, createEvent, createStore } from 'effector';
import { Model, modelFactory } from 'effector-factorio';
import { LatLngExpression, MapOptions } from 'leaflet';

type MapFactoryOptions = {
    center: MapOptions['center'];
    zoom: MapOptions['zoom'];
    markers: LatLngExpression[];
};

export const mapFactory = modelFactory((options: MapFactoryOptions) => {
    const mapLoaded = createEvent();
    const map = createStore({}).on(mapLoaded, (_, data) => data);

    const $center = createStore<MapOptions['center']>(options.center);
    const $zoom = createStore<MapOptions['zoom']>(options.zoom);
    const $markers = createStore<LatLngExpression[]>(options.markers);
    const $map = combine($center, $zoom, $markers, (center, zoom, markers) => ({
        center,
        zoom,
        markers,
    }));

    return {
        mapLoaded,
        map,
        $map,
    };
});

export type MapFactory = Model<typeof mapFactory>;
