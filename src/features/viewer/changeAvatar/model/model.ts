import { modelFactory } from 'effector-factorio';
import { createEvent, createStore, Effect, sample } from 'effector';
import { User } from '@/shared/api';
import { sharedConfigLocale } from '@/shared/config';
import { convertBase64ToFileFx, resizeImageFx } from './effects';
import { ERROR_MIN_SIZE, ERROR_UNKNOWN, translationNS } from '../config';

const { locale } = sharedConfigLocale;

interface FactoryOptions {
    minWidth: number;
    minHeight: number;
    resizeToMaxWidth: number;
    resizeToMaxHeight: number;
    changeAvatarFx: Effect<File, User>;
}

export const factory = modelFactory((options: FactoryOptions) => {
    const fileSelected = createEvent<File>();
    const cancelPressed = createEvent();
    const confirmPressed = createEvent();
    const setError = createEvent<Error>();
    const imgSourceChanged = createEvent<string>();
    const imgDistributionChanged = createEvent<string>();
    const UploadError = createEvent<Error>();
    const retry = createEvent();
    const reset = createEvent();

    const $isPending = options.changeAvatarFx.pending;

    const $error = createStore<Error[]>([])
        .on(setError, (state, payload) => [...state, payload])
        .on(resizeImageFx.failData, (state, payload) => [...state, payload])
        .on(options.changeAvatarFx.failData, (state, payload) => [
            ...state,
            payload,
        ])
        .reset([options.changeAvatarFx.done, reset]);

    fileSelected.watch((file) => {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            const imageUrl = reader.result?.toString() || '';
            const imageElement = new Image();

            imageElement.src = imageUrl;
            imageElement.addEventListener('load', () => {
                const { naturalWidth, naturalHeight } = imageElement;

                const isSmallerThanMin =
                    naturalWidth < options.minWidth ||
                    naturalHeight < options.minHeight;
                if (isSmallerThanMin) {
                    setError(
                        new Error(
                            locale.t(ERROR_MIN_SIZE, {
                                replace: {
                                    size: options.minHeight,
                                },
                                ns: translationNS,
                            }),
                        ),
                    );

                    imgSourceChanged('');
                } else {
                    imgSourceChanged(imageUrl);
                }
            });
        });

        reader.readAsDataURL(file);
    });

    const $imgSource = createStore<string>('', { name: 'imgSource' })
        .on(imgSourceChanged, (_, dataUrl) => dataUrl)
        .reset([options.changeAvatarFx.doneData, cancelPressed, reset]);

    const $imgSourceResized = createStore<string>('')
        .on(resizeImageFx.doneData, (_, payload) => payload)
        .reset([options.changeAvatarFx.doneData, cancelPressed, reset]);

    const $imgDistribution = createStore<string>('')
        .on(imgDistributionChanged, (_, dataUrl) => dataUrl)
        .reset([options.changeAvatarFx.doneData, cancelPressed, reset]);

    sample({
        clock: $imgSource,
        filter: (data) => !!data && data.length > 0,
        fn: (base64) => ({
            base64,
            maxWidth: options.resizeToMaxWidth,
            maxHeight: options.resizeToMaxHeight,
        }),
        target: resizeImageFx,
    });

    sample({
        clock: [confirmPressed, retry],
        source: $imgDistribution,
        filter: (data) => !!data && data.length > 0,
        fn: (upload) => ({
            base64: upload,
            filename: 'avatar.png',
        }),
        target: convertBase64ToFileFx,
    });

    sample({
        clock: convertBase64ToFileFx.doneData,
        target: options.changeAvatarFx,
    });

    sample({
        clock: options.changeAvatarFx.failData,
        target: UploadError,
    });

    sample({
        clock: options.changeAvatarFx.failData,
        fn: () =>
            new Error(
                locale.t(ERROR_UNKNOWN, {
                    ns: translationNS,
                }),
            ),
        target: setError,
    });

    return {
        $isPending,
        $error,
        retry,
        reset,
        UploadError,
        cancelPressed,
        confirmPressed,
        imgSourceChanged,
        $imgSource: $imgSourceResized,
        imgDistributionChanged,
        fileSelected,
    };
});
