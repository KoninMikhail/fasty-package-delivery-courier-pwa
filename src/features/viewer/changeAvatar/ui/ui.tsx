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
import 'react-image-crop/src/ReactCrop.scss';
import {
    centerCrop,
    convertToPixelCrop,
    makeAspectCrop,
    PercentCrop,
    ReactCrop,
} from 'react-image-crop';
import { setCanvasPreview } from '@/features/viewer/changeAvatar/lib/utils';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import { factory } from '../model';
import { translationNS } from '../config';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;
const ALLOWED_FORMATS = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/gif',
    'image/bmp',
    'image/webp',
    'image/svg+xml',
    'image/tiff',
    'image/x-icon',
    'image/vnd.microsoft.icon',
    'image/vnd.wap.wbmp',
    'image/apng',
    'image/avif',
    'image/flif',
    'image/x-portable-pixmap',
    'image/x-portable-anymap',
    'image/x-portable-bitmap',
    'image/x-portable-graymap',
    'image/x-portable-pixmap',
    'image/x-xbitmap',
    'image/x-xpixmap',
    'image/x-xwindowdump',
    'image/bmp',
    'image/x-bmp',
    'image/x-ms-bmp',
    'image/x-win-bitmap',
    'image/x-windows-bmp',
    'image/x-ms-bmp',
    'image/x-icon',
    'image/x-ico',
    'image/ico',
    'image/x-win-bitmap',
    'image/x-win-bmp',
    'image/vnd.microsoft.icon',
    'image/x-jg',
];
const TRANSLATION = {
    BUTTON_LABEL: 'uploadButton.text',
};

interface UploadInputProperties {
    onSelectFile: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UploadInput: FunctionComponent<UploadInputProperties> = ({
    onSelectFile,
}) => {
    const model = factory.useModel();
    const { t } = useTranslation(translationNS);

    const isPending = useUnit(model.$isPending);
    const fileInputReference = useRef<HTMLInputElement>(null);

    const onPressUploadButton = (): void => {
        if (fileInputReference.current) {
            fileInputReference.current.click();
        }
    };

    return (
        <>
            <input
                ref={fileInputReference}
                type="file"
                accept={ALLOWED_FORMATS.toString()}
                className="hidden"
                onChange={onSelectFile}
            />
            <Button
                onPress={onPressUploadButton}
                size="sm"
                isLoading={isPending}
            >
                {isPending ? 'loading' : t(TRANSLATION.BUTTON_LABEL)}
            </Button>
        </>
    );
};

const ModalActions: FunctionComponent<{
    onConfirmPressed: () => void;
    onCancelPressed: () => void;
}> = ({ onConfirmPressed, onCancelPressed }) => {
    const { t } = useTranslation(translationNS);

    return (
        <div className="flex w-full gap-2">
            <Button color="danger" fullWidth onPress={onCancelPressed}>
                {t('cancel.text')}
            </Button>
            <Button fullWidth color="primary" onPress={onConfirmPressed}>
                {t('confirm.text')}
            </Button>
        </div>
    );
};

export const Error: FunctionComponent<{ error: string }> = () => {
    const { t } = useTranslation(translationNS);
    return <p>{t('error.text')}</p>;
};

export const UploadButton = modelView(factory, () => {
    const model = factory.useModel();
    const imgReference = useRef<HTMLImageElement>(null);
    const previewCanvasReference = useRef<HTMLCanvasElement>(null);

    const [imgSource, setImgSource] = useState('');

    const [dataUrl, setDataUrl] = useUnit([
        model.$dataUrl,
        model.dataUrlChanged,
    ]);

    const [crop, setCrop] = useState<PercentCrop>();
    const [error, setError] = useState('');

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [progress, confirm, cancel] = useUnit([
        model.$isPending,
        model.confirmPressed,
        model.cancelPressed,
    ]);

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

    const onPressSubmit = (): void => {
        if (imgReference.current && previewCanvasReference.current && crop) {
            setCanvasPreview(
                imgReference.current, // HTMLImageElement
                previewCanvasReference.current, // HTMLCanvasElement
                convertToPixelCrop(
                    crop,
                    imgReference.current.width,
                    imgReference.current.height,
                ),
            );
            onClose();
            setDataUrl(previewCanvasReference.current.toDataURL());
            confirm();
        }
    };

    const onPressCancel = (): void => {
        onClose();
        cancel();
    };

    return (
        <>
            <UploadInput onSelectFile={onSelectFile} />
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                placement="center"
                size="xl"
                isKeyboardDismissDisabled
                backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Выберите аватар
                            </ModalHeader>
                            <ModalBody>
                                {error ? <Error error={error} /> : null}
                                {imgSource ? (
                                    <div className="flex flex-col items-center">
                                        <ReactCrop
                                            crop={crop}
                                            onChange={(_, percentCrop) =>
                                                setCrop(percentCrop)
                                            }
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
                                <ModalActions
                                    onConfirmPressed={onPressSubmit}
                                    onCancelPressed={onPressCancel}
                                />
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
});
