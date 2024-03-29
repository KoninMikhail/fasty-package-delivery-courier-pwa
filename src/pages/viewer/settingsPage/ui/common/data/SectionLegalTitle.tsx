import { useTranslation } from 'react-i18next';
import { SECTION_LEGAL_TITLE, translationNS } from '../../../config';

export const SectionLegalTitle: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return t(SECTION_LEGAL_TITLE);
};
