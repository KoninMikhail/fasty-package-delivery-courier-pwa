import { useTranslation } from 'react-i18next';
import { translationNS, THEME_MODE_SYSTEM } from '../../../config';

export const SystemText: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return t(THEME_MODE_SYSTEM);
};
