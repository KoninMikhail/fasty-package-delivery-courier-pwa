import { useTranslation } from 'react-i18next';
import { PAGE_SUBHEADER, translationNS } from '../../../config';

export const HistoryPageSubHeaderText: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return t(PAGE_SUBHEADER);
};
