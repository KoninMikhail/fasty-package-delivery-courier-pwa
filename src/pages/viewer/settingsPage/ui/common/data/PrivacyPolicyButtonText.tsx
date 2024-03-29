import { useTranslation } from 'react-i18next';
import { SECTION_LEGAL_PRIVACY_POLICY, translationNS } from '../../../config';

export const PrivacyPolicyButtonText: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return t(SECTION_LEGAL_PRIVACY_POLICY);
};
