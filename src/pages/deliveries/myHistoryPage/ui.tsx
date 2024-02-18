import { useDocumentTitle } from 'usehooks-ts';
import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { viewerUi } from '@/entities/viewer';
import { widgetsDeliveriesHistoryUi } from '@/widgets/deliveries/history';
import { useEffect } from 'react';
import { getDeliveriesHistoryFx } from '@/widgets/deliveries/history/model';

const { Authorized } = viewerUi;
const { NavbarMobile } = widgetNavbarMobileUi;
const { DeliveriesHistoryList } = widgetsDeliveriesHistoryUi;

const pagetitle = 'Доставки';
const PAGE_HEADING = 'История доставок';

const Header: FunctionComponent<{ header: string }> = ({ header }) => (
    <div className="w-full rounded-b-3xl bg-black p-6 text-center">
        <h1>{header}</h1>
    </div>
);

export const MyHistoryPage: FunctionComponent = () => {
    useDocumentTitle(pagetitle);

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
