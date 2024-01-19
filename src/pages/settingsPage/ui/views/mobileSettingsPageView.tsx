import { PropsWithChildren } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { sharedUiLayouts } from '@/shared/ui';
import { SwitchThemeMode } from '@/features/system/switchThemeMode/ui';
import { SwitchLanguage } from '@/features/system/switchAppLanguage/ui/SwitchLanguage';
import { Image, Button, Divider, Spacer } from '@nextui-org/react';
import { SlSocialVkontakte } from 'react-icons/sl';
import { IoLogoYoutube } from 'react-icons/io';
import { widgetLegalUi } from '@/widgets/system/legal';
import { widgetAboutAppUi } from '@/widgets/system/about';

const { Section } = sharedUiLayouts;
const { NavbarMobile } = widgetNavbarMobileUi;
const { LegalInformationModal } = widgetLegalUi;
const { AboutAppModal } = widgetAboutAppUi;

/*
 * Layout
 */
const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col px-2 lg:mx-auto lg:w-[750px]">
        {children}
    </main>
);

/**
 * @name MobileSettingsPageView
 * @constructor
 */
export const MobileSettingsPageView: FunctionComponent = () => {
    return (
        <>
            <MainContainer>
                <Section>
                    <div className="flex items-center justify-center gap-2">
                        <Image
                            width={180}
                            src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                            alt="NextUI Album Cover"
                            classNames="m-5"
                        />
                    </div>
                </Section>
                <Spacer />
                <Divider />
                <Spacer />
                <div>
                    <div>Связаться с поддержкой</div>
                    <div className="flex w-full">
                        <div className="flex h-20 flex-1 items-center justify-center">
                            <Button color="primary">Позвонить</Button>
                        </div>
                        <div className="flex h-20 flex-1 items-center justify-center">
                            <Button color="primary">Чат</Button>
                        </div>
                    </div>
                </div>
                <Spacer />
                <Divider />
                <Spacer />
                <div className="flex w-full">
                    <div className="flex h-20 flex-1 items-center justify-center">
                        <SlSocialVkontakte className="text-5xl" />
                    </div>
                    <div className="flex h-20 flex-1 items-center justify-center">
                        <IoLogoYoutube className="text-5xl text-primary" />
                    </div>
                </div>
                <Spacer />
                <Divider />
                <Spacer />
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
                <Spacer />
                <Divider />
                <Spacer />
                <Section>
                    <LegalInformationModal />
                    <AboutAppModal />
                </Section>
                <Section />
            </MainContainer>
            <NavbarMobile />
        </>
    );
};
