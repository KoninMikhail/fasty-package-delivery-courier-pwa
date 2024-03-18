import { MapContainer } from './ui';
import { singleLocationFactory } from './factories/singleLocationFactory';
import { multiLocationFactory } from './factories/multiLocationFactory';

export const Route = {
    Map: {
        multiLocationFactory,
        singleLocationFactory,
        Container: MapContainer,
    },
};
