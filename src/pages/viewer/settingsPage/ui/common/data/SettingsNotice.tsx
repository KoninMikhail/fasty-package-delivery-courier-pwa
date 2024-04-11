import { useTranslation } from 'react-i18next';
import { NOTIFICATION_CONTENT, translationNS } from '../../../config';

export const SettingsNotice: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return t(NOTIFICATION_CONTENT);
};
