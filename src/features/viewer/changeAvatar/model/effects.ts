import { createEffect } from 'effector';
import { debug } from 'patronum';
import { base64ToFile } from '../lib';

type ResizeImageParameters = {
    base64: string;
    maxWidth: number;
    maxHeight: number;
};

export const resizeImageFx = createEffect({
    handler: async ({ base64, maxWidth, maxHeight }: ResizeImageParameters) => {
        return new Promise<string>((resolve, reject) => {
            const img = new Image();
            img.addEventListener('load', () => {
                let { width, height } = img;

                // Checking if the image needs resizing
                if (width > maxWidth || height > maxHeight) {
                    const aspectRatio = width / height;

                    if (width > height) {
                        width = maxWidth;
                        height = maxWidth / aspectRatio;
                    } else {
                        height = maxHeight;
                        width = maxHeight * aspectRatio;
                    }
                }

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;

                context?.drawImage(img, 0, 0, width, height);

                const resizedBase64 = canvas.toDataURL('image/png');
                resolve(resizedBase64);
            });

            img.onerror = (error) => reject(error);

            img.src = base64;
        });
    },
});

export const convertBase64ToFileFx = createEffect<
    { base64: string; filename: string },
    File
>(({ base64, filename }) => base64ToFile(base64, filename));

debug({
    img: convertBase64ToFileFx.doneData,
});
