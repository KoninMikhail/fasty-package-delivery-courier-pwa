import { Modal, ModalContent, useDisclosure } from '@nextui-org/react';

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
                className="bg-map-light dark:bg-map-dark w-full rounded-t-3xl bg-center"
                onClick={onMapClick}
            >
                <div className="w-full pb-28 pt-8 text-center">
                    Посмотреть на карте
                </div>
            </div>
            <Modal size="full" isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nullam pulvinar risus non risus
                                hendrerit venenatis. Pellentesque sit amet
                                hendrerit risus, sed porttitor quam.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nullam pulvinar risus non risus
                                hendrerit venenatis. Pellentesque sit amet
                                hendrerit risus, sed porttitor quam.
                            </p>
                            <p>
                                Magna exercitation reprehenderit magna aute
                                tempor cupidatat consequat elit dolor
                                adipisicing. Mollit dolor eiusmod sunt ex
                                incididunt cillum quis. Velit duis sit officia
                                eiusmod Lorem aliqua enim laboris do dolor
                                eiusmod.
                            </p>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
