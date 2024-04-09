import { useTranslation } from 'react-i18next';
import { PAGE_HEADING, translationNS } from '../../../config';

export const PageTitle: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return t(PAGE_HEADING);
};
