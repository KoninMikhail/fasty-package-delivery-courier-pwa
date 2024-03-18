import {
    MapContainer as LeafletMapContainer,
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
import { singleLocationFactory } from '../factories/singleLocationFactory';

const DEFAULT_ZOOM = 12;

const LocationMarker: FunctionComponent = () => {
    const factory = singleLocationFactory.useModel();
    const markers = useUnit(factory.$locations);
    const setPosition = useUnit(factory.locationChanged);
    const map = useMap();

    useEffect(() => {
        if (markers && markers.length > 0) {
            setPosition(markers[0]);
            map.setView(markers[0], map.getZoom(), { animate: true });
        }
    }, [markers, setPosition, map]);

    return markers === null ? null : (
        <>
            {markers.map((marker, index) => (
                <Marker key={index} position={marker}>
                    <Popup>You are here</Popup>
                </Marker>
            ))}
        </>
    );
};

interface SimpleMapProperties {
    className?: string;
    zoom?: MapOptions['zoom'];
    center?: MapOptions['center'];
}

export const MapContainer = modelView(
    singleLocationFactory,
    ({ className, zoom }: SimpleMapProperties) => {
        const model = singleLocationFactory.useModel();
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
            <LeafletMapContainer
                center={center}
                zoom={zoom || DEFAULT_ZOOM}
                zoomControl={false}
                className={className}
                scrollWheelZoom={false}
                attributionControl={false}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker />
                <ZoomControl position="bottomright" />
            </LeafletMapContainer>
        );
    },
);
