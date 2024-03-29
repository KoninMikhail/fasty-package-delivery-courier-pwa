import { useTranslation } from 'react-i18next';
import { translationNS, THEME_MODE_LIGHT } from '../../../config';

export const LightText: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return t(THEME_MODE_LIGHT);
};
