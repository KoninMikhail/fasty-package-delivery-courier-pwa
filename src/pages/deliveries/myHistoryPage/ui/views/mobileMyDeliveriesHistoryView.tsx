import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { widgetsDeliveriesHistoryUi } from '@/widgets/deliveries/history';

const { NavbarMobile } = widgetNavbarMobileUi;
const { DeliveriesHistoryList } = widgetsDeliveriesHistoryUi;

const pagetitle = 'Доставки';
const PAGE_HEADING = 'История доставок';

const Header: FunctionComponent<{ header: string }> = ({ header }) => (
    <div className="w-full rounded-b-3xl bg-black p-6 text-center">
        <h1>{header}</h1>
    </div>
);

export const MobileMyDeliveriesHistoryView: FunctionComponent = () => {
    return (
        <>
            <Header header={PAGE_HEADING} />
            <DeliveriesHistoryList />
            <NavbarMobile />
        </>
    );
};
