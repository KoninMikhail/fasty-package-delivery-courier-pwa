import { modelFactory } from 'effector-factorio';
import { createEvent, createStore, Effect, sample } from 'effector';
import { User } from '@/shared/api';
import { sharedConfigLocale } from '@/shared/config';
import { resizeImageFx } from './effects';
import { ERROR_MIN_SIZE, translationNS } from '../config';

const { locale } = sharedConfigLocale;

interface FactoryOptions {
    minWidth: number;
    minHeight: number;
    resizeToMaxWidth: number;
    resizeToMaxHeight: number;
    changeAvatarFx: Effect<string, User>;
}

export const factory = modelFactory((options: FactoryOptions) => {
    const fileSelected = createEvent<File>();
    const cancelPressed = createEvent();
    const confirmPressed = createEvent();
    const setError = createEvent<string>();
    const imgSourceChanged = createEvent<string>();
    const imgDistributionChanged = createEvent<string>();

    const $isPending = options.changeAvatarFx.pending;

    const $error = createStore<string>('')
        .on(setError, (_, payload) => payload)
        .on(resizeImageFx.failData, (_, error) => error.message)
        .on(options.changeAvatarFx.failData, (_, error) => error.message)
        .reset([options.changeAvatarFx.done]);

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
                        locale.t(ERROR_MIN_SIZE, {
                            replace: {
                                size: options.minHeight,
                            },
                            ns: translationNS,
                        }),
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
        .reset([options.changeAvatarFx.doneData, cancelPressed]);

    const $imgSourceResized = createStore<string>('', {
        name: 'imgSourceResized',
    })
        .on(resizeImageFx.doneData, (_, payload) => payload)
        .reset([options.changeAvatarFx.doneData, cancelPressed]);

    const $imgDistribution = createStore<string>('')
        .on(imgDistributionChanged, (_, dataUrl) => dataUrl)
        .reset([options.changeAvatarFx.doneData, cancelPressed]);

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
        clock: confirmPressed,
        source: $imgDistribution,
        filter: (data) => !!data && data.length > 0,
        fn: (upload) => upload,
        target: options.changeAvatarFx,
    });

    return {
        $isPending,
        $error,
        cancelPressed,
        confirmPressed,
        imgSourceChanged,
        $imgSource: $imgSourceResized,
        imgDistributionChanged,
        fileSelected,
    };
});
