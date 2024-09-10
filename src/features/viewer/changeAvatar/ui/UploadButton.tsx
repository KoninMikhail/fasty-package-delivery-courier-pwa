import { modelView } from 'effector-factorio';
import { Button, ButtonProps } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import { ChangeEvent, useRef } from 'react';
import { CropModal } from './common/CropModal';
import {
    ALLOWED_FORMATS,
    BUTTON_PENDING_TEXT,
    BUTTON_UPLOAD_LABEL,
    translationNS,
} from '../config';
import { factory } from '../model';

interface UploadButtonProperties
    extends Pick<ButtonProps, 'size' | 'isDisabled'> {}

const InputButton = ({ size, isDisabled }: UploadButtonProperties) => {
    const model = factory.useModel();
    const { t } = useTranslation(translationNS);

    const isPending = useUnit(model.$isPending);
    const fileInputReference = useRef<HTMLInputElement>(null);

    const fileSelected = useUnit(model.fileSelected);

    const onPressUploadButton = (): void => {
        if (fileInputReference.current) {
            fileInputReference.current.click();
        }
    };

    const onSelectFile = (event: ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];

        if (file) {
            fileSelected(file);
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
                size={size}
                isLoading={isPending}
                isDisabled={isDisabled}
            >
                {isPending ? t(BUTTON_PENDING_TEXT) : t(BUTTON_UPLOAD_LABEL)}
            </Button>
        </>
    );
};

export const UploadButton = modelView(
    factory,
    ({ size, isDisabled }: UploadButtonProperties) => {
        return (
            <>
                <InputButton size={size} isDisabled={isDisabled} />
                <CropModal />
            </>
        );
    },
);
