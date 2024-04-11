import { useTranslation } from 'react-i18next';
import { SEARCH_NOT_FOUND_KEY, translationNS } from '../../../config';

export const SearchNotFoundText: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return t(SEARCH_NOT_FOUND_KEY);
};
