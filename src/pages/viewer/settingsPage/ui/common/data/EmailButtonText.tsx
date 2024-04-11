import { useTranslation } from 'react-i18next';
import {
    SECTION_HELP_SUPPORT_EMAIL_BUTTON,
    translationNS,
} from '../../../config';

export const EmailButtonText: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return t(SECTION_HELP_SUPPORT_EMAIL_BUTTON);
};
