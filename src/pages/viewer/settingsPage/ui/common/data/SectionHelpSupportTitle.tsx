import { useTranslation } from 'react-i18next';
import { SECTION_HELP_SUPPORT_TITLE, translationNS } from '../../../config';

export const SectionHelpSupportTitle: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return t(SECTION_HELP_SUPPORT_TITLE);
};
