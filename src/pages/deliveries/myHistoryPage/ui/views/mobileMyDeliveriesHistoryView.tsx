import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { widgetsDeliveriesHistoryUi } from '@/widgets/deliveries/history';
import { Divider, Spacer } from '@nextui-org/react';
import { PropsWithChildren } from 'react';
import { HistoryPageHeaderText } from '@/pages/deliveries/myHistoryPage/ui/common/locale/HistoryPageHeaderText';
import { HistoryPageSubHeaderText } from '@/pages/deliveries/myHistoryPage/ui/common/locale/HistorySubHeaderText';
import { DetectDeviceType } from '@/features/device/detecDeviceType';

const { NavbarMobile } = widgetNavbarMobileUi;
const { DeliveriesHistoryList } = widgetsDeliveriesHistoryUi;

const Wrapper: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="mx-auto h-full w-full flex-col rounded-t-3xl pb-24 lg:w-[750px]">
        {children}
    </div>
);

const Header: FunctionComponent = () => {
    return (
        <header className="max-w-full gap-4 px-4 pt-4">
            <div>
                <h1 className="text-xl font-bold">
                    <HistoryPageHeaderText />
                </h1>
                <span className="text-sm">
                    <HistoryPageSubHeaderText />
                </span>
            </div>
        </header>
    );
};

export const MobileMyDeliveriesHistoryView: FunctionComponent = () => {
    return (
        <>
            <Wrapper>
                <Header />
                <Spacer y={4} />
                <Divider />
                <DeliveriesHistoryList />
                <NavbarMobile />
            </Wrapper>
            <DetectDeviceType.GuardAppVersion />
        </>
    );
};
