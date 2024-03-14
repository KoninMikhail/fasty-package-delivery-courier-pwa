import { createEffect } from 'effector';
import {apiClient} from "@/shared/api";

interface SetUserAvatarImageFxParameters {
    userId: string;
    image: string;
}

export const setUserAvatarImage = createEffect(async () => {
    return apiClient.
});
