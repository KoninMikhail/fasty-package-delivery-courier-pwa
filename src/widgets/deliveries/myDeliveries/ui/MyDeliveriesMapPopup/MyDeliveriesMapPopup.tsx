import {
    Button,
    Modal,
    ModalContent,
    Spacer,
    useDisclosure,
} from '@nextui-org/react';
import { RiWifiOffFill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import {
    DeliveryMapBaloonCard,
    getDeliveryCoordinates,
    getDeliverySystemId,
} from '@/entities/delivery';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { MdOutlineLocationSearching } from 'react-icons/md';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { sharedConfigRoutes } from '@/shared/config';
import { $myDeliveriesStore } from '../../model/stores';
import {
    DEFAULT_MAP_CENTER,
    DEFAULT_MAP_ZOOM,
    DEFAULT_MAP_ZOOM_MOBILE,
    ERROR_NO_INTERNET_TEXT_KEY,
    translationNS,
    WIDGET_MAP_TITLE_KEY,
} from '../../config';
import { networkModel } from '@/entities/viewer';

const { RouteName } = sharedConfigRoutes;
const { DELIVERIES } = RouteName;

const {$$isOnline} = networkModel;

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

const MapControls: FunctionComponent = () => {
    const map = useMap();
    const onClickReturnToTarget = (): void => {
        map.flyTo(DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM);
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
                'absolute right-0 top-1/2 z-[5000] flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-2',
                'rounded-2xl bg-background p-2 shadow-md',
            )}
        >
            <Button
                className="z-[6000] rounded-xl"
                onPress={onClickReturnToTarget}
                isIconOnly
            >
                <MdOutlineLocationSearching />
            </Button>
            <Button
                color="primary"
                variant="flat"
                className="z-[6000] rounded-xl"
                onPress={onClickZoomIn}
                isIconOnly
            >
                <FaPlus />
            </Button>
            <Button
                color="primary"
                variant="flat"
                className="z-[6000] rounded-xl"
                onPress={onClickZoomOut}
                isIconOnly
            >
                <FaMinus />
            </Button>
        </div>
    );
};

const Map: FunctionComponent = () => {
    const deliveries = useUnit($myDeliveriesStore);
    const navigate = useNavigate();
    return (
        <MapContainer
            center={DEFAULT_MAP_CENTER}
            zoom={DEFAULT_MAP_ZOOM_MOBILE}
            scrollWheelZoom={false}
            className="h-full w-full"
            attributionControl={false}
            zoomControl={false}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {deliveries.map((delivery) => {
                const id = getDeliverySystemId(delivery);
                const coordinates = getDeliveryCoordinates(delivery);

                const onPressDetailsPageLink = (): void =>
                    navigate(`${DELIVERIES}/${id}`);

                return (
                    <Marker
                        key={delivery.id}
                        position={{
                            lat: Number.parseFloat(
                                coordinates?.latitude ?? '0',
                            ),
                            lng: Number.parseFloat(
                                coordinates?.longitude ?? '0',
                            ),
                        }}
                    >
                        <Popup autoPan minWidth={300}>
                            <DeliveryMapBaloonCard
                                delivery={delivery}
                                onPressDetailsPageLink={onPressDetailsPageLink}
                            />
                        </Popup>
                    </Marker>
                );
            })}
            <MapControls />
        </MapContainer>
    );
};

export const MyDeliveriesMapPopup: FunctionComponent = () => {
    const online = useUnit($$isOnline);
    const { t } = useTranslation(translationNS);
    const { isOpen, onOpen: onMapClick, onClose } = useDisclosure();

    return (
        <>
            <div
                className="w-full rounded-t-3xl bg-map-light bg-center dark:bg-map-dark"
                onClick={onMapClick}
            >
                <div className="w-full pb-28 pt-8 text-center">
                    {t(WIDGET_MAP_TITLE_KEY)}
                </div>
            </div>
            <Modal
                size="full"
                isOpen={isOpen}
                onClose={onClose}
                classNames={{
                    closeButton:
                        'z-[5000] bg-background p-4 text-xl rounded-lg mt-4 mr-6',
                }}
            >
                <ModalContent>
                    {online ? (
                        <div className="relative h-full w-full">
                            <Map />
                        </div>
                    ) : (
                        <OfflinePlaceholder />
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
