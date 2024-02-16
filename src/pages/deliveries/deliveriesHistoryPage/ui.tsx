import { useDocumentTitle } from 'usehooks-ts';
import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { viewerUi } from '@/entities/viewer';
import { widgetsDeliveriesHistoryUi } from '@/widgets/deliveries/history-deliveries';
import { useEffect } from 'react';
import { getDeliveriesHistoryFx } from '@/widgets/deliveries/history-deliveries/model';

const { Authorized } = viewerUi;
const { NavbarMobile } = widgetNavbarMobileUi;
const { DeliveriesHistoryList } = widgetsDeliveriesHistoryUi;

const PAGE_TITLE = 'Доставки';
const PAGE_HEADING = 'История доставок';

const Header: FunctionComponent<{ header: string }> = ({ header }) => (
    <div className="w-full rounded-b-3xl bg-black p-6 text-center">
        <h1>{header}</h1>
    </div>
);

export const DeliveriesHistoryPage: FunctionComponent = () => {
    useDocumentTitle(PAGE_TITLE);

    useEffect(() => {
        void getDeliveriesHistoryFx();
    }, []);

    return (
        <Authorized>
            <Header header={PAGE_HEADING} />
            <DeliveriesHistoryList />
            <NavbarMobile />
        </Authorized>
    );
};
