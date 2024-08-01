import { createEffect } from 'effector';
import { apiClient } from '@/shared/api';
import { sharedConfigConstants } from '@/shared/config';
import { sharedLibUtils } from '@/shared/lib';

const { APP_DEMO_MODE } = sharedConfigConstants;
const { asyncTimeout } = sharedLibUtils;

export type ChangePasswordFxParameters = {
    password: string;
};

export const setViewerAccountPasswordFx = createEffect({
    handler: async ({ password }: ChangePasswordFxParameters) => {
        try {
            if (APP_DEMO_MODE) {
                await asyncTimeout(2000);
                return null;
            }
            return await apiClient.resetPassword({ password });
        } catch (error: unknown) {
            if (error instanceof Error) throw new Error(error.message);
            throw error;
        }
    },
});
