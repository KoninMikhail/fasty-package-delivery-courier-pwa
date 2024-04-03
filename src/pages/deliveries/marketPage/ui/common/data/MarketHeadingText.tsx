import { useTranslation } from 'react-i18next';
import { MARKET_LABEL, translationNS } from '../../../config';

export const MarketHeadingText: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return t(MARKET_LABEL);
};
