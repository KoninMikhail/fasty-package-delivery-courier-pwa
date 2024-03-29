import { useTranslation } from 'react-i18next';
import { SECTION_LEGAL_COOKIE_POLICY, translationNS } from '../../../config';

export const CookiesPolicyButtonText: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return t(SECTION_LEGAL_COOKIE_POLICY);
};
