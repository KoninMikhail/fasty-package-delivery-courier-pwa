import { useDocumentTitle } from 'usehooks-ts';
import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { Authorized, Offline, SlowNetwork } from '@/entities/viewer';
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

export const FloatingInfo: FunctionComponent = () => {
    return (
        <div className="fixed top-0 w-full text-center">
            <Offline>dsfsdfdfs</Offline>
            <SlowNetwork>слоу нетворк</SlowNetwork>
        </div>
    );
};

export const MyHistoryPage: FunctionComponent = () => {
    useDocumentTitle(pagetitle);

    return (
        <Authorized>
            <FloatingInfo />
            <Header header={PAGE_HEADING} />
            <DeliveriesHistoryList />
            <NavbarMobile />
        </Authorized>
    );
};
