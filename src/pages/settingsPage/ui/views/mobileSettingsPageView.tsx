import type { PropsWithChildren } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { sharedUiLayouts } from '@/shared/ui';
import { sessionUi } from '@/entities/session';

const { Authorized, Guest } = sessionUi;
const { NavbarMobile } = widgetNavbarMobileUi;
const { Section } = sharedUiLayouts;

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col px-2 lg:mx-auto lg:w-[750px]">
        {children}
    </main>
);

const Header: FunctionComponent = () => (
    <header className="w-full rounded-b-3xl bg-black p-6">
        <div className="grid grid-cols-[auto_max-content] text-white">
            <div>asds</div>
            <div>icon</div>
        </div>
        <div className="grid justify-between text-white">
            <div>Здравствуйте, Михаил</div>
            <div>
                <b className="text-xl">Пришло время доставлять заказы</b>
            </div>
        </div>
    </header>
);

export const MobileSettingsPageView: FunctionComponent = () => {
    return (
        <>
            <Header />
            <MainContainer>
                <Authorized>
                    <Section title="Заказы">profile</Section>
                    <Section title="Заказы">menu</Section>
                </Authorized>
                <Guest>Вам нужно авторизоваться</Guest>
            </MainContainer>
            <NavbarMobile />
        </>
    );
};
