import { LatLngExpression } from 'leaflet';
import { MapContainerProps } from 'react-leaflet';

/* eslint-disable @typescript-eslint/no-magic-numbers */

export const DEFAULT_MAP_CENTER: LatLngExpression = {
    lat: 55.753_993_999_993_74,
    lng: 37.622_093_000_000_01,
};

export const DEFAULT_MAP_ZOOM: MapContainerProps['zoom'] = 13;
