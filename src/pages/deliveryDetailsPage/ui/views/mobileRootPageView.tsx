import type { PropsWithChildren, ReactNode } from 'react';

import { widgetInProgressDeliveriesUi } from '@/widgets/deliveries/in-progress-deliveries';
import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { widgetDeliveriesMarketUi } from '@/widgets/deliveries/deliveres-market';
import { sessionUi } from '@/entities/session';
import { sharedUiComponents } from '@/shared/ui';
import { widgetAccountDataEditorUi } from '@/widgets/account/account-data-editor';
import { Spacer } from '@nextui-org/react';

const { Heading, Text, NativeScroll } = sharedUiComponents;
const { Authorized, Guest } = sessionUi;
const { InProgressDeliveriesSlider } = widgetInProgressDeliveriesUi;
const { DeliveriesMarket } = widgetDeliveriesMarketUi;
const { NavbarMobile } = widgetNavbarMobileUi;
const { AccountDataEditor } = widgetAccountDataEditorUi;

/**
 * @name MainContainer
 * @description Container for page content
 * @param children
 * @constructor
 */
const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col lg:mx-auto lg:w-[750px]">
        {children}
    </main>
);

interface ISectionProperties {
    children: ReactNode | ReactNode[];
    padding?: 'default' | 'none';
}
const Section: FunctionComponent<ISectionProperties> = ({
    children,
    padding = 'default',
}) =>
    padding === 'default' ? (
        <section className="w-full px-4">{children}</section>
    ) : (
        <section className="w-full">{children}</section>
    );

const Header: FunctionComponent = () => (
    <header className="w-full rounded-b-3xl bg-black p-6">
        <div className="mx-auto grid w-full grid-cols-[auto_max-content] items-center gap-2 text-white lg:w-[750px]">
            <div>
                <Text weight="bold">Здравствуйте, Михаил</Text>
                <Text size="small">Желаем хорошего дня!</Text>
            </div>
            <div>
                <AccountDataEditor />
            </div>
        </div>
    </header>
);

export const MobileRootPageView: FunctionComponent = () => {
    return (
        <>
            <Header />
            <Spacer y={4} />
            <MainContainer>
                <Authorized>
                    <Section padding="none">
                        <Heading size="large" weight="bold" className="pl-4">
                            Активные доставки
                        </Heading>
                        <NativeScroll direction="horizontal">
                            <div className="px-4">
                                <InProgressDeliveriesSlider />
                            </div>
                        </NativeScroll>
                    </Section>
                    <Spacer y={4} />
                    <Section padding="default">
                        <Heading size="large" weight="bold">
                            Доступные доставки
                        </Heading>
                        <DeliveriesMarket />
                    </Section>
                </Authorized>
                <Guest>Вам нужно авторизоваться</Guest>
            </MainContainer>
            <NavbarMobile />
        </>
    );
};
