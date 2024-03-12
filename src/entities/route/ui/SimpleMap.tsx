import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
    ZoomControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useUnit } from 'effector-react/effector-react.mjs';
import { modelView } from 'effector-factorio';
import { useEffect, useLayoutEffect, useState } from 'react';
import { LatLngExpression, MapOptions } from 'leaflet';
import { singleLocationFactory } from '../factories/singleLocationFactory';

const DEFAULT_CENTER: LatLngExpression = {
    lat: 55.753_025_906_384_16,
    lng: 37.620_334_238_617_83,
};
const DEFAULT_ZOOM = 12;

const LocationMarker = () => {
    const factory = singleLocationFactory.useModel();
    const position = useUnit(factory.$location);
    const setPosition = useUnit(factory.locationChanged);
    const map = useMap();
    const location = useUnit(factory.$location);

    useEffect(() => {
        if (position) {
            map.setView(location);
        }
    }, [location, map]);

    useEffect(() => {
        setTimeout(() => {
            setPosition({
                lat: 55.751_864_162_201_57,
                lng: 37.990_436_167_328_774,
            });
        }, 1000);
    }, []);

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    );
};

interface SimpleMapProperties {
    className?: string;
    zoom?: MapOptions['zoom'];
    center?: MapOptions['center'];
}

export const SimpleMap = modelView(
    singleLocationFactory,
    ({ className, zoom, center }: SimpleMapProperties) => {
        const [unmountMap, setunmountMap] = useState<boolean>(false);

        useLayoutEffect(() => {
            setunmountMap(false);
            return () => {
                setunmountMap(true);
            };
        }, []);

        if (unmountMap) {
            return <div>Map unmounted</div>;
        }

        return (
            <MapContainer
                center={center || DEFAULT_CENTER}
                zoom={zoom || DEFAULT_ZOOM}
                zoomControl={false}
                className={className}
                scrollWheelZoom={false}
                attributionControl={false}
            >
                <TileLayer
                    attribution=""
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
                <ZoomControl position="bottomright" />
            </MapContainer>
        );
    },
);
