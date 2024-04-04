import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { widgetsDeliveriesHistoryUi } from '@/widgets/deliveries/history';
import { useTranslation } from 'react-i18next';
import { translationNS, PAGE_HEADER } from '../../config';

const { NavbarMobile } = widgetNavbarMobileUi;
const { DeliveriesHistoryList } = widgetsDeliveriesHistoryUi;

const Header: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);

    return (
        <div className="w-full rounded-b-3xl bg-black p-6 text-center">
            <h1>{t(PAGE_HEADER)}</h1>
        </div>
    );
};

export const MobileMyDeliveriesHistoryView: FunctionComponent = () => {
    return (
        <>
            <Header />
            <DeliveriesHistoryList />
            <NavbarMobile />
        </>
    );
};
