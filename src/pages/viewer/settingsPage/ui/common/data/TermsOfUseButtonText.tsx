import { useTranslation } from 'react-i18next';
import { SECTION_LEGAL_TERMS_OF_USE, translationNS } from '../../../config';

export const TermsOfUseButtonText: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return t(SECTION_LEGAL_TERMS_OF_USE);
};
