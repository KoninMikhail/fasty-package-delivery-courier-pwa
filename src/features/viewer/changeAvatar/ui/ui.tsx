import { modelView } from 'effector-factorio';
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';
import { ChangeEvent, useRef, useState } from 'react';
import { factory } from '../model';
import 'react-image-crop/src/ReactCrop.scss';
import {
    centerCrop,
    convertToPixelCrop,
    makeAspectCrop,
    PercentCrop,
    ReactCrop,
} from 'react-image-crop';
import { setCanvasPreview } from '@/features/viewer/changeAvatar/lib/utils';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export const UploadButton = modelView(factory, () => {
    const imgReference = useRef(null);
    const previewCanvasReference = useRef(null);
    const [imgSource, setImgSource] = useState('');
    const [crop, setCrop] = useState<PercentCrop>();
    const [error, setError] = useState('');
    const fileInputReference = useRef<HTMLInputElement>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const onPressCustomButton = (): void => {
        if (fileInputReference.current) {
            fileInputReference.current.click();
        }
    };

    const onSelectFile = (event: ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || '';
            imageElement.src = imageUrl;

            imageElement.addEventListener('load', (imageEvent) => {
                if (error) setError('');
                const { naturalWidth, naturalHeight } =
                    imageEvent.currentTarget as HTMLImageElement;
                if (
                    naturalWidth < MIN_DIMENSION ||
                    naturalHeight < MIN_DIMENSION
                ) {
                    setError('Image must be at least 150 x 150 pixels.');
                    setImgSource('');
                }
            });
            setImgSource(imageUrl);
        });
        reader.readAsDataURL(file);
        onOpen();
    };

    const onImageLoad = (event: ChangeEvent<HTMLImageElement>) => {
        const { width, height } = event.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

        const crop = makeAspectCrop(
            {
                unit: '%',
                width: cropWidthInPercent,
            },
            ASPECT_RATIO,
            width,
            height,
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    return (
        <div>
            <input
                ref={fileInputReference}
                type="file"
                accept="image/jpeg, image/png, image/jpg, image/gif, image/bmp, image/webp, image/svg+xml, image/tiff, image/x-icon, image/vnd.microsoft.icon, image/vnd.wap.wbmp, image/apng, image/avif, image/flif, image/x-portable-pixmap, image/x-portable-anymap, image/x-portable-bitmap, image/x-portable-graymap, image/x-portable-pixmap, image/x-xbitmap, image/x-xpixmap, image/x-xwindowdump, image/bmp, image/x-bmp, image/x-ms-bmp, image/x-win-bitmap, image/x-windows-bmp, image/x-ms-bmp, image/x-icon, image/x-ico, image/ico, image/x-win-bitmap, image/x-win-bmp, image/vnd.microsoft.icon, image/x-jg"
                className="hidden"
                onChange={onSelectFile}
            />
            <Button onPress={onPressCustomButton} size="sm">
                Выбрать файл
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                placement="center"
                isKeyboardDismissDisabled
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Modal Title
                            </ModalHeader>
                            <ModalBody>
                                {error ? (
                                    <p className="text-xs text-red-400">
                                        {error}
                                    </p>
                                ) : null}
                                {imgSource ? (
                                    <div className="flex flex-col items-center">
                                        <ReactCrop
                                            crop={crop}
                                            onChange={(
                                                pixelCrop,
                                                percentCrop,
                                            ) => setCrop(percentCrop)}
                                            circularCrop
                                            keepSelection
                                            aspect={ASPECT_RATIO}
                                            minWidth={MIN_DIMENSION}
                                        >
                                            <img
                                                ref={imgReference}
                                                src={imgSource}
                                                alt="Upload"
                                                style={{ maxHeight: '70vh' }}
                                                onLoad={onImageLoad}
                                            />
                                        </ReactCrop>
                                    </div>
                                ) : null}
                                {crop ? (
                                    <canvas
                                        ref={previewCanvasReference}
                                        className="mt-4"
                                        style={{
                                            display: 'none',
                                            border: '1px solid black',
                                            objectFit: 'contain',
                                            width: 150,
                                            height: 150,
                                        }}
                                    />
                                ) : null}
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={() => {
                                        setCanvasPreview(
                                            imgReference.current, // HTMLImageElement
                                            previewCanvasReference.current, // HTMLCanvasElement
                                            convertToPixelCrop(
                                                crop,
                                                imgReference.current.width,
                                                imgReference.current.height,
                                            ),
                                        );
                                        const dataUrl =
                                            previewCanvasReference.current.toDataURL();
                                        console.log(dataUrl);
                                    }}
                                >
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
});
