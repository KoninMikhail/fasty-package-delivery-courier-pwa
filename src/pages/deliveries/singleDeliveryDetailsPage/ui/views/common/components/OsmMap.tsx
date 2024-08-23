import L, { LatLngExpression, LatLngLiteral } from 'leaflet';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { Button, Link, Spinner } from '@nextui-org/react';
import { LuPackage } from 'react-icons/lu';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import clsx from 'clsx';
import { useLayoutEffect, useMemo, useState } from 'react';
import { generateYandexMapsLink } from '@/pages/deliveries/singleDeliveryDetailsPage/lib';
import { Offline, Online } from '@/entities/viewer';
import { useUnit } from 'effector-react';
import { getDeliveryAddress } from '@/entities/delivery';
import { Delivery } from '@/shared/api';
import { useTranslation } from 'react-i18next';
import {
    $pageDeliveryDetails,
    $$deliveryCoordinates,
} from '../../../../model/stores';
import {
    FALLBACK_MAP_CENTER,
    FALLBACK_MAP_ZOOM,
    LABEL_MAPS_NOT_AVAILABLE,
    LABEL_MAPS_OPEN_IN_EXTERNAL_APP,
    translationNS,
} from '../../../../config';

interface IYMAPSFallback {
    address: string;
    classNames?: {
        container?: string;
    };
}

const YMAPSFallback: FunctionComponent<IYMAPSFallback> = ({
    address,
    classNames,
}) => {
    const { t } = useTranslation(translationNS);
    const mapsQueryLink = generateYandexMapsLink(address);
    return (
        <div
            className={clsx(
                'flex h-[50vh] w-full flex-col items-center justify-center gap-6 bg-content1',
                classNames?.container,
            )}
        >
            <div className="px-6 text-center">
                <p className="text-2xl">
                    {t(LABEL_MAPS_NOT_AVAILABLE).split(',')[0]}
                </p>
                <p className="text-xs font-light">
                    {t(LABEL_MAPS_NOT_AVAILABLE).split(',')[1]}
                </p>
            </div>
            <Button
                href={mapsQueryLink}
                as={Link}
                color="primary"
                className="rounded-md"
                showAnchorIcon
                size="sm"
            >
                {t(LABEL_MAPS_OPEN_IN_EXTERNAL_APP)}
            </Button>
        </div>
    );
};

interface IMapControlsProperties {
    marker: LatLngExpression;
    center: LatLngExpression;
    zoom: number;
    classNames?: {
        container?: string;
    };
}

const MapControls: FunctionComponent<IMapControlsProperties> = ({
    marker,
    classNames,
    zoom,
}) => {
    const map = useMap();
    const onClickReturnToTarget = (): void => {
        map.flyTo(marker, zoom);
    };

    const onClickZoomIn = (): void => {
        map.zoomIn();
    };

    const onClickZoomOut = (): void => {
        map.zoomOut();
    };

    return (
        <div
            className={clsx(
                'absolute bottom-4 right-4 flex flex-col gap-2',
                classNames?.container,
            )}
        >
            <Button
                className="z-[6000] rounded-2xl"
                onPress={onClickReturnToTarget}
                isIconOnly
            >
                <LuPackage />
            </Button>
            <Button
                color="primary"
                variant="flat"
                className="z-[6000] rounded-2xl"
                onPress={onClickZoomIn}
                isIconOnly
            >
                <FaPlus />
            </Button>
            <Button
                color="primary"
                variant="flat"
                className="z-[6000] rounded-2xl"
                onPress={onClickZoomOut}
                isIconOnly
            >
                <FaMinus />
            </Button>
        </div>
    );
};

interface IOSMMapProperties {
    marker?: LatLngLiteral;
    zoom?: number;
    classNames?: {
        container?: string;
        controlsPanel?: string;
    };
}

export const OSMMap: FunctionComponent<IOSMMapProperties> = ({
    zoom,
    classNames,
}) => {
    const delivery = useUnit($pageDeliveryDetails);

    const { container, controlsPanel } = classNames || {};
    const [unmountMap, setUnmountMap] = useState<boolean>(false);

    const markerLocation = useUnit($$deliveryCoordinates);
    const markerAddress = getDeliveryAddress(delivery as Delivery);
    const markerZoom = zoom || FALLBACK_MAP_ZOOM;
    const markerIcon = useMemo(
        () =>
            new L.Icon({
                iconUrl: '/icons/map/marker-icon-2x.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [0, -41],
            }),
        [],
    );

    useLayoutEffect(() => {
        setUnmountMap(false);
        return () => {
            setUnmountMap(true);
        };
    }, []);

    if (unmountMap)
        return (
            <div className={clsx('relative h-[50vh] w-full', container)}>
                <div className="flex h-full w-full items-center justify-center">
                    <Spinner color="default" />
                </div>
            </div>
        );

    if (!markerLocation)
        return (
            <div className={clsx('relative h-[50vh] w-full', container)}>
                <YMAPSFallback
                    address={markerAddress}
                    classNames={{ container }}
                />
            </div>
        );

    return (
        <div className={clsx('relative h-[50vh] w-full', container)}>
            <Offline>
                <YMAPSFallback
                    address={markerAddress}
                    classNames={{ container }}
                />
            </Offline>
            <Online>
                <MapContainer
                    center={markerLocation || FALLBACK_MAP_CENTER}
                    zoom={zoom || FALLBACK_MAP_ZOOM}
                    scrollWheelZoom={false}
                    className={clsx('relative h-[50vh] w-full', container)}
                    zoomControl={false}
                    attributionControl={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={markerLocation} icon={markerIcon} />
                    <MapControls
                        marker={markerLocation}
                        classNames={{
                            container: controlsPanel,
                        }}
                        center={markerLocation}
                        zoom={markerZoom}
                    />
                </MapContainer>
            </Online>
        </div>
    );
};
