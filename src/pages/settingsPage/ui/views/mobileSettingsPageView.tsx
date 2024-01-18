import { PropsWithChildren } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { sharedUiLayouts } from '@/shared/ui';
import { sessionUi } from '@/entities/session';
import { SwitchThemeMode } from '@/features/system/switchThemeMode/ui';
import { SwitchLanguage } from '@/features/system/switchAppLanguage/ui/SwitchLanguage';
import {
    Image,
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
    useDisclosure,
} from '@nextui-org/react';
import { SlSocialVkontakte } from 'react-icons/sl';
import { IoLogoYoutube } from 'react-icons/io';

const { Authorized, Guest } = sessionUi;
const { NavbarMobile } = widgetNavbarMobileUi;
const { Section } = sharedUiLayouts;

/*
 * Layout
 */
const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col px-2 lg:mx-auto lg:w-[750px]">
        {children}
    </main>
);

/*
 * Components
 */

interface AboutAppModalProperties {
    isOpen: boolean;
    onOpenChange: () => void;
}
const LegalInformation: FunctionComponent<AboutAppModalProperties> = ({
    isOpen,
    onOpenChange,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            placement="bottom-center"
            onOpenChange={onOpenChange}
            scrollBehavior="inside"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Правовая информация
                        </ModalHeader>
                        <ModalBody className="max-h-3/5">
                            <p>
                                MIT License Copyright (c) [year] [fullname]
                                Permission is hereby granted, free of charge, to
                                any person obtaining a copy of this software and
                                associated documentation files (the "Software"),
                                to deal in the Software without restriction,
                                including without limitation the rights to use,
                                copy, modify, merge, publish, distribute,
                                sublicense, and/or sell copies of the Software,
                                and to permit persons to whom the Software is
                                furnished to do so, subject to the following
                                conditions: The above copyright notice and this
                                permission notice shall be included in all
                                copies or substantial portions of the Software.
                                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT
                                WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                                INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                                MERCHANTABILITY, FITNESS FOR A PARTICULAR
                                PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
                                THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
                                ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
                                IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
                                ARISING FROM, OUT OF OR IN CONNECTION WITH THE
                                SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                                SOFTWARE.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button fullWidth onPress={onClose}>
                                Закрыть
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

interface AboutAppModalProperties {
    isOpen: boolean;
    onOpenChange: () => void;
}
const AboutAppInformation: FunctionComponent<AboutAppModalProperties> = ({
    isOpen,
    onOpenChange,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            placement="bottom-center"
            onOpenChange={onOpenChange}
            scrollBehavior="inside"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            О приложении
                        </ModalHeader>
                        <ModalBody className="max-h-3/5">
                            <p>Версия 2,28 от 26.08.2021</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button fullWidth onPress={onClose}>
                                Закрыть
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export const MobileSettingsPageView: FunctionComponent = () => {
    const {
        isOpen: isAboutAppOpen,
        onOpenChange: onAboutAppInformationOpenChange,
    } = useDisclosure();
    const {
        isOpen: isLegalInformationOpen,
        onOpenChange: onLegalInformationOpenChange,
    } = useDisclosure();
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
                    <Button onPress={onLegalInformationOpenChange}>
                        Правовая информация
                    </Button>
                </Section>
                <Section>
                    <Button onPress={onAboutAppInformationOpenChange}>
                        О приложении
                    </Button>
                </Section>
            </MainContainer>
            <AboutAppInformation
                isOpen={isAboutAppOpen}
                onOpenChange={onAboutAppInformationOpenChange}
            />
            <LegalInformation
                isOpen={isLegalInformationOpen}
                onOpenChange={onLegalInformationOpenChange}
            />
            <NavbarMobile />
        </>
    );
};
