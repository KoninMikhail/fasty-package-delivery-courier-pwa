import { MapContainer } from './ui';
import { mapFactory } from './factories/mapFactory';

export const Route = {
    Map: {
        factory: mapFactory,
        SingleLocationMap: MapContainer,
    },
};
