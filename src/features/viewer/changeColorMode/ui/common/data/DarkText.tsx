import { useTranslation } from 'react-i18next';
import { translationNS, THEME_MODE_DARK } from '../../../config';

export const DarkText: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return t(THEME_MODE_DARK);
};
