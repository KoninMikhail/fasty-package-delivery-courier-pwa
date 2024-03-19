import {
    MapContainer as LeafletMapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useUnit } from 'effector-react/effector-react.mjs';
import { modelView } from 'effector-factorio';
import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { LeafletMouseEvent, MapOptions } from 'leaflet';
import { Spinner } from '@nextui-org/react';
import { mapFactory } from '../factories/mapFactory';

const DEFAULT_ZOOM = 12;
const ZERO_INDEX = 0;

const LocationMarker: FunctionComponent = () => {
    const factory = mapFactory.useModel();
    const markers = useUnit(factory.$markers);
    const map = useMap();
    const setPosition = useUnit(factory.locationChanged);

    const onMarkerClick = (event: LeafletMouseEvent): void => {
        setPosition(event.latlng);
        map.setView(event.latlng, factory.$zoom.getState(), { animate: true });
    };

    useEffect(() => {
        if (markers && markers.length > ZERO_INDEX) {
            setPosition(markers[ZERO_INDEX]);
            map.setView(markers[ZERO_INDEX], map.getZoom(), { animate: true });
        }
    }, [markers, setPosition, map]);

    return markers === null ? null : (
        <>
            {markers.map((marker, index) => (
                <Marker
                    key={`marker-${index}`}
                    position={marker}
                    eventHandlers={{ click: onMarkerClick }}
                >
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
    children?: ReactNode;
}

export const MapContainer = modelView(
    mapFactory,
    ({ className, zoom, children }: SimpleMapProperties) => {
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
                {children}
            </LeafletMapContainer>
        );
    },
);
