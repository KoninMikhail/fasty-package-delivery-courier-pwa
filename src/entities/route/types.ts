import { LatLngExpression } from 'leaflet';
import { ReactNode } from 'react';

export type MapMarker = {
    coordinates: LatLngExpression;
    content?: ReactNode;
};
