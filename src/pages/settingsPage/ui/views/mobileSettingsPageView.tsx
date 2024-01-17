import type { PropsWithChildren } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { sharedUiLayouts } from '@/shared/ui';
import { sessionUi } from '@/entities/session';
import { SwitchThemeMode } from '@/features/system/switchThemeMode/ui';
import { SwitchLanguage } from '@/features/system/switchAppLanguage/ui/SwitchLanguage';
import { Divider } from '@nextui-org/react';

const { Authorized, Guest } = sessionUi;
const { NavbarMobile } = widgetNavbarMobileUi;
const { Section } = sharedUiLayouts;

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col px-2 lg:mx-auto lg:w-[750px]">
        {children}
    </main>
);

export const MobileSettingsPageView: FunctionComponent = () => {
    return (
        <>
            <MainContainer>
                <Section>
                    <div className="flex items-center gap-2">
                        <div className="flex-grow">Язык</div>
                        <div>
                            <SwitchLanguage />
                        </div>
                    </div>
                </Section>
                <Divider />
                соц сети
                <Divider />
                <Section>
                    <div className="flex items-center gap-2">
                        <div className="flex-grow">Язык</div>
                        <div>
                            <SwitchLanguage />
                        </div>
                    </div>
                </Section>
                <Section>
                    <div className="flex items-center gap-2">
                        <div className="flex-grow">Используемая тема</div>
                        <div>
                            <SwitchThemeMode />
                        </div>
                    </div>
                </Section>
                <Divider />
                <Section>Правовая информация</Section>
                <Section>О приложении</Section>
            </MainContainer>
            <NavbarMobile />
        </>
    );
};
