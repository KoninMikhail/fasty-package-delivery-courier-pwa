import { createGate } from 'effector-react';
import { createStore, sample } from 'effector';
import { Logout } from '@/features/auth/logout';
import { widgetSelectAvatarModel } from '@/widgets/viewer/select-avatar';
import { DetectNetworkConnectionState } from '@/features/device/detectNetworkConnectionState';
import { widgetSelectPasswordModel } from '@/widgets/viewer/select-password';
import { RefreshToken } from '@/features/auth/refreshToken';
import { and } from 'patronum';

/**
 * Externals
 */

const {
    model: { $$isOnline },
} = DetectNetworkConnectionState;

export const ProfilePageGate = createGate();

/**
 * Page initialization
 */
const $isPageVisible = ProfilePageGate.status;
const $isFirstPageLoad = createStore<boolean>(false)
    .on(ProfilePageGate.open, () => true)
    .reset(Logout.model.userLoggedOut);

/**
 * ============================
 * Change network state
 * ============================
 */

sample({
    clock: $$isOnline,
    filter: (isOnline) => isOnline === false || isOnline === true,
    fn: (isOnline) => !isOnline,
    target: [
        widgetSelectAvatarModel.setOffline,
        widgetSelectPasswordModel.setOffline,
    ],
});

/**
 * Logout when user is not authorized and user is online
 */
sample({
    clock: RefreshToken.updateTokenFail,
    source: and($$isOnline, $isPageVisible),
    filter: (isOnline) => !!isOnline,
    target: Logout.model.logout,
});

sample({
    clock: Logout.model.userLoggedOut,
    source: $$isOnline,
    filter: (isOnline) => !!isOnline,
    target: widgetSelectAvatarModel.reset,
});
