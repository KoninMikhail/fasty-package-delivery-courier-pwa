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
import { MapOptions } from 'leaflet';
import { Spinner } from '@nextui-org/react';
import { mapFactory } from '../factories/mapFactory';

const DEFAULT_ZOOM = 12;

const LocationMarker: FunctionComponent = () => {
    const factory = mapFactory.useModel();
    const position = useUnit(factory.$location);
    const setPosition = useUnit(factory.locationChanged);
    const map = useMap();

    useEffect(() => {
        if (position) {
            setPosition(position);
            map.setView(position, map.getZoom(), { animate: true });
        }
    }, [position, setPosition, map]);

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

export const MultiLocationMap = modelView(
    mapFactory,
    ({ className, zoom }: SimpleMapProperties) => {
        const model = mapFactory.useModel();
        const center = useUnit(model.$center);

        const [unmountMap, setUnmountMap] = useState<boolean>(false);

        useLayoutEffect(() => {
            setUnmountMap(false);
            return () => {
                setUnmountMap(true);
            };
        }, []);

        if (unmountMap) {
            return (
                <div className={className}>
                    <div className="flex h-full w-full items-center justify-center">
                        <Spinner color="default" />
                    </div>
                </div>
            );
        }

        return (
            <MapContainer
                center={center}
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
