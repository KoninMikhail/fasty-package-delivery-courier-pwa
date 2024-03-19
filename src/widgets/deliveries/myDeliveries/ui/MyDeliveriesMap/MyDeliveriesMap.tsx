import { Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

export const MyDeliveriesMap: FunctionComponent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const onMapClick = (): void => {
        onOpen();
    };
    return (
        <>
            <div
                className="w-full  rounded-t-3xl bg-map-light bg-center dark:bg-map-dark"
                onClick={onMapClick}
            >
                <div className="w-full pb-28 pt-8 text-center">
                    Посмотреть на карте
                </div>
            </div>
            <Modal
                size="full"
                isOpen={isOpen}
                onClose={onClose}
                classNames={{
                    closeButton: 'z-[5000]',
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <MapContainer
                            center={[51.505, -0.09]}
                            zoom={13}
                            className="h-screen w-full"
                            scrollWheelZoom={false}
                            attributionControl={false}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[51.505, -0.09]}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily
                                    customizable.
                                </Popup>
                            </Marker>
                        </MapContainer>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
