import { createEvent, sample } from 'effector';
import { widgetSignInModalModel } from '@/widgets/viewer/sign-in-modal';
import { widgetCookiePolicyModalModel } from '@/widgets/polices/cookiePolicyModal';
import { widgetPrivacyPolicyModalModel } from '@/widgets/polices/privacyPolicyModal';
import { widgetTermsOfUseModalModel } from '@/widgets/polices/termsOfUseModal';
import { widgetResetPasswordModalModel } from '@/widgets/viewer/reset-password-modal';
import { createGate } from 'effector-react';

/**
 * Gate for the page
 */
export const AuthPageGate = createGate<void>();

/**
 * Auth
 */
export const pressSignInButton = createEvent();

sample({
    clock: pressSignInButton,
    target: widgetSignInModalModel.setVisible,
});

/**
 * Cookie policy
 */

sample({
    source: widgetSignInModalModel.pressedOpenCookiePolicyLink,
    target: [
        widgetSignInModalModel.setHidden,
        widgetCookiePolicyModalModel.setVisible,
    ],
});
sample({
    clock: widgetCookiePolicyModalModel.setHidden,
    target: widgetSignInModalModel.setVisible,
});

/**
 * Privacy policy
 */
sample({
    source: widgetSignInModalModel.pressedOpenPrivacyPolicyLink,
    target: [
        widgetSignInModalModel.setHidden,
        widgetPrivacyPolicyModalModel.setVisible,
    ],
});
sample({
    clock: widgetPrivacyPolicyModalModel.setHidden,
    target: widgetSignInModalModel.setVisible,
});

/**
 * Terms of use
 */
sample({
    clock: widgetSignInModalModel.pressedOpenTermsOfUseLink,
    target: [
        widgetSignInModalModel.setHidden,
        widgetTermsOfUseModalModel.setVisible,
    ],
});
sample({
    clock: widgetTermsOfUseModalModel.setHidden,
    target: widgetSignInModalModel.setVisible,
});

/**
 * Reset password
 */
export const pressRecoveryButton = createEvent();

sample({
    clock: pressRecoveryButton,
    target: widgetResetPasswordModalModel.setVisible,
});
