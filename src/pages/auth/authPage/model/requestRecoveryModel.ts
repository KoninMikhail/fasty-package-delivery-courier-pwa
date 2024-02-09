import { createEvent, sample } from 'effector';
import { widgetResetPasswordModalModel } from '@/widgets/viewer/reset-password-modal';

/**
 * Reset password
 */
export const pressRecoveryButton = createEvent();

sample({
    source: pressRecoveryButton,
    target: widgetResetPasswordModalModel.setVisible,
});
