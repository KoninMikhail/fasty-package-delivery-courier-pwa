import { useTranslation } from 'react-i18next';
import { SEARCH_RESULTS_KEY, translationNS } from '../../../config';

export const SearchResultsText: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return t(SEARCH_RESULTS_KEY);
};
