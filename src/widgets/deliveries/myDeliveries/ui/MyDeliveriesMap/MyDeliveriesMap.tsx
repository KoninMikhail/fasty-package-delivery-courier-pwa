import { Spacer } from '@nextui-org/react';
import { RiWifiOffFill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { useList, useUnit } from 'effector-react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { DeliveryMapCard } from '@/entities/delivery';
import { sessionModel } from '@/entities/viewer';
import {
    DEFAULT_MAP_CENTER,
    DEFAULT_MAP_ZOOM,
    ERROR_NO_INTERNET_TEXT_KEY,
    translationNS,
} from '../../config';
import { $$deliveriesMarkers } from '../../model/deliveriesMapMarkers';
import { $deliveriesStore } from '../../model/deliveriesStore';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

const OfflinePlaceholder: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="block h-full w-full p-4">
            <div className="flex h-full w-full flex-col items-center justify-center">
                <RiWifiOffFill className="text-8xl text-content3" />
                <Spacer y={3} />
                <div>
                    <span className="text-center text-lg text-content3">
                        {t(ERROR_NO_INTERNET_TEXT_KEY)}
                    </span>
                </div>
            </div>
        </div>
    );
};

const Map: FunctionComponent = () => {
    const markers = useUnit($$deliveriesMarkers);
    return (
        <MapContainer
            center={DEFAULT_MAP_CENTER}
            zoom={DEFAULT_MAP_ZOOM}
            scrollWheelZoom={false}
            className="h-full w-full"
            attributionControl={false}
            zoomControl={false}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {markers.map((marker, index) => (
                <Marker key={index} position={marker} />
            ))}
        </MapContainer>
    );
};

const CardsRow: FunctionComponent = () => {
    const deliveries = useList($deliveriesStore, (delivery) => (
        <DeliveryMapCard delivery={delivery} />
    ));

    return (
        <div className="overflow-x-auto">
            <div className="flex h-[200px] flex-nowrap gap-2 px-4 pl-16">
                {deliveries}
            </div>
        </div>
    );
};

interface MyDeliveriesMapProperties {
    classNames?: {
        cardsRow?: string;
    };
}
export const MyDeliveriesMap: FunctionComponent<MyDeliveriesMapProperties> = ({
    classNames,
}) => {
    const online = useUnit(sessionModel.$$isOnline);
    return online ? (
        <div className="relative h-full w-full">
            <div className="absolute bottom-0 z-[6000]  w-full py-4 text-red-600">
                <CardsRow />
            </div>
            <Map />
        </div>
    ) : (
        <OfflinePlaceholder />
    );
};
