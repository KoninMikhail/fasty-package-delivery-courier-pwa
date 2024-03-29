import { modelView } from 'effector-factorio';
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react';
import { ChangeEvent, useMemo, useRef, useState } from 'react';
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
import {
    ASPECT_RATIO,
    MIN_DIMENSION,
    MODAL_BUTTON_CANCEL,
    MODAL_BUTTON_CONFIRM,
    MODAL_TITLE,
    translationNS,
} from '../config';

const ModalActions: FunctionComponent<{
    waitComplete: boolean;
    onConfirmPressed: () => void;
    onCancelPressed: () => void;
}> = ({ onConfirmPressed, onCancelPressed, waitComplete }) => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="flex w-full gap-2">
            <Button
                color="danger"
                fullWidth
                isDisabled={waitComplete}
                onPress={onCancelPressed}
            >
                {t(MODAL_BUTTON_CANCEL)}
            </Button>
            <Button
                fullWidth
                color="primary"
                isLoading={waitComplete}
                onPress={onConfirmPressed}
            >
                {t(MODAL_BUTTON_CONFIRM)}
            </Button>
        </div>
    );
};

export const CropModal = modelView(factory, () => {
    const { t } = useTranslation(translationNS);
    const model = factory.useModel();
    const imgReference = useRef<HTMLImageElement>(null);
    const previewCanvasReference = useRef<HTMLCanvasElement>(null);

    const imgSource = useUnit(model.$imgSource);
    const setDistributionUrl = useUnit(model.imgDistributionChanged);
    const hasImageToCrop = useMemo(
        () => !!(imgSource && imgSource.length > 0),
        [imgSource],
    );

    const [crop, setCrop] = useState<PercentCrop>();

    const [progress, confirm, cancel] = useUnit([
        model.$isPending,
        model.confirmPressed,
        model.cancelPressed,
    ]);

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
            setDistributionUrl(previewCanvasReference.current.toDataURL());
            confirm();
        }
    };

    const onPressCancel = (): void => {
        cancel();
    };

    return (
        <Modal
            isOpen={hasImageToCrop}
            isDismissable={false}
            placement="center"
            size="xl"
            isKeyboardDismissDisabled
            backdrop="blur"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    {t(MODAL_TITLE)}
                </ModalHeader>
                <ModalBody>
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
                                width: MIN_DIMENSION,
                                height: MIN_DIMENSION,
                            }}
                        />
                    ) : null}
                </ModalBody>
                <ModalFooter>
                    <ModalActions
                        waitComplete={progress}
                        onConfirmPressed={onPressSubmit}
                        onCancelPressed={onPressCancel}
                    />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});
