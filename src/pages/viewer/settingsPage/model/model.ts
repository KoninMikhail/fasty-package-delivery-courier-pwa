import { createEvent, sample } from 'effector';
import { widgetCookiePolicyModalModel } from '@/widgets/polices/cookiePolicyModal';
import { widgetPrivacyPolicyModalModel } from '@/widgets/polices/privacyPolicyModal';
import { widgetTermsOfUseModalModel } from '@/widgets/polices/termsOfUseModal';

/**
 * Cookie policy
 */
export const pressOpenCookiePolicyLink = createEvent();

sample({
    source: pressOpenCookiePolicyLink,
    target: widgetCookiePolicyModalModel.setVisible,
});
/**
 * Privacy policy
 */

export const pressOpenPrivacyPolicyLink = createEvent();
sample({
    source: pressOpenPrivacyPolicyLink,
    target: widgetPrivacyPolicyModalModel.setVisible,
});

/**
 * Terms of use
 */
export const pressOpenTermsOfUseLink = createEvent();
sample({
    source: pressOpenTermsOfUseLink,
    target: widgetTermsOfUseModalModel.setVisible,
});
