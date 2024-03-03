import { createEffect, createEvent, sample } from 'effector';
import { widgetSignInModalModel } from '@/widgets/viewer/sign-in-modal';
import { widgetCookiePolicyModalModel } from '@/widgets/polices/cookiePolicyModal';
import { widgetPrivacyPolicyModalModel } from '@/widgets/polices/privacyPolicyModal';
import { widgetTermsOfUseModalModel } from '@/widgets/polices/termsOfUseModal';
import { authByEmailFx } from '@/entities/viewer';

/**
 * Auth
 */
export const pressSignInButton = createEvent();
sample({
    source: pressSignInButton,
    target: widgetSignInModalModel.setVisible,
});

sample({
    clock: authByEmailFx.doneData,
    target: widgetSignInModalModel.setHidden,
});

/**
 * Cookie policy
 */
export const pressOpenCookiePolicyLink = createEvent();

sample({
    source: pressOpenCookiePolicyLink,
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

export const pressOpenPrivacyPolicyLink = createEvent();
sample({
    source: pressOpenPrivacyPolicyLink,
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
export const pressOpenTermsOfUseLink = createEvent();
sample({
    source: pressOpenTermsOfUseLink,
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
 * Sign in
 */
export const redirectAfterFetch = createEffect<string, string, Error>(
    (path) => path,
);
