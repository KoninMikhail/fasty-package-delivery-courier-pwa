import { PropsWithChildren } from 'react';

import { widgetMyDeliveriesUi } from '@/widgets/deliveries/myDeliveries';
import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { sharedUiComponents } from '@/shared/ui';
import { Spacer } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { PAGE_HEADER, PAGE_SUBHEADER, translationNS } from '../../config';

const { MyDeliveriesList, MyDeliveriesFilters, MyDeliveriesMapPopup } =
    widgetMyDeliveriesUi;
const { NavbarMobile } = widgetNavbarMobileUi;
const { Heading, Text, NativeScroll } = sharedUiComponents;

const Wrapper: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="mx-auto h-full w-full flex-col rounded-t-3xl pb-24 lg:w-[750px]">
        {children}
    </div>
);

const MapSection: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="z-10">{children}</div>
);

const ListSection: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="relative -mt-8 block w-full rounded-t-2xl bg-background p-2">
        {children}
    </div>
);

const Header: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <header className="max-w-full gap-4 px-4 pt-4">
            <div>
                <Heading size="large" weight="bold">
                    {t(PAGE_HEADER)}
                </Heading>
                <Text as="span" size="small">
                    {t(PAGE_SUBHEADER)}
                </Text>
            </div>
        </header>
    );
};

export const MobileMyDeliveriesPageView: FunctionComponent = () => {
    return (
        <>
            <Wrapper>
                <Header />
                <Spacer y={4} />
                <MyDeliveriesFilters />
                <Spacer y={6} />
                <MapSection>
                    <MyDeliveriesMapPopup />
                </MapSection>
                <ListSection>
                    <MyDeliveriesList />
                </ListSection>
            </Wrapper>
            <NavbarMobile />
        </>
    );
};
