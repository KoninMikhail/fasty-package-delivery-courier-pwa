import { createEvent, sample } from 'effector';
import { widgetSignInModalModel } from '@/widgets/viewer/sign-in-modal';
import { widgetCookiePolicyModalModel } from '@/widgets/polices/cookiePolicyModal';
import { widgetPrivacyPolicyModalModel } from '@/widgets/polices/privacyPolicyModal';
import { widgetTermsOfUseModalModel } from '@/widgets/polices/termsOfUseModal';
import { authByEmailFx, sessionModel } from '@/entities/viewer';
import { widgetResetPasswordModalModel } from '@/widgets/viewer/reset-password-modal';
import { createGate } from 'effector-react';
import { debounce } from 'patronum';

const { resourcesLoaded } = sessionModel;

/**
 * Gate for the page
 */
export const AuthPageGate = createGate<void>();

/**
 * Page initialization
 */
sample({
    clock: debounce(AuthPageGate.status, 500),
    filter: (isOpen) => isOpen,
    target: resourcesLoaded,
});

/**
 * Auth
 */
export const pressSignInButton = createEvent();

sample({
    clock: pressSignInButton,
    target: widgetSignInModalModel.setVisible,
});

sample({
    clock: authByEmailFx.doneData,
    target: [widgetSignInModalModel.setHidden, resourcesLoaded],
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
