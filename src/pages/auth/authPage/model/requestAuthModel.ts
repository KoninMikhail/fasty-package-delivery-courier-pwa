import { createEvent, sample } from 'effector';
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
    source: widgetSignInModalModel.pressedOpenTermsOfUseLink,
    target: [
        widgetSignInModalModel.setHidden,
        widgetTermsOfUseModalModel.setVisible,
    ],
});
sample({
    clock: widgetTermsOfUseModalModel.setHidden,
    target: widgetSignInModalModel.setVisible,
});
