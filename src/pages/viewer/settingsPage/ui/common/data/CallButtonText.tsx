import { useTranslation } from 'react-i18next';
import {
    SECTION_HELP_SUPPORT_CALL_BUTTON,
    translationNS,
} from '../../../config';

export const CallButtonText: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return t(SECTION_HELP_SUPPORT_CALL_BUTTON);
};
