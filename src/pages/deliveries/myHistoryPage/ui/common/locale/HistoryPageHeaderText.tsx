import { useTranslation } from 'react-i18next';
import { PAGE_HEADER, translationNS } from '../../../config';

export const HistoryPageHeaderText: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return t(PAGE_HEADER);
};
