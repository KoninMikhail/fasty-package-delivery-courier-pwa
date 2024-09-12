import { useTranslation } from 'react-i18next';
import { SEARCH_EMPTY_QUERY_KEY, translationNS } from '../../../config';

export const SearchEmptyQueryText: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return t(SEARCH_EMPTY_QUERY_KEY);
};
