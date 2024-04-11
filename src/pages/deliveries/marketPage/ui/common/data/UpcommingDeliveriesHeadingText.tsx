import { useTranslation } from 'react-i18next';
import { UPCOMING_DELIVERIES_LABEL, translationNS } from '../../../config';

export const UpcomingDeliveriesHeadingText: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return t(UPCOMING_DELIVERIES_LABEL);
};
