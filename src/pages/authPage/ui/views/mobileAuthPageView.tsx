import { PropsWithChildren, useState } from 'react';
import {
    Button,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
    useDisclosure,
} from '@nextui-org/react';

import { widgetInProgressDeliveriesUi } from '@/widgets/deliveries/in-progress-deliveries';
import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { widgetDeliveriesMarketUi } from '@/widgets/deliveries/deliveres-market';
import { sessionUi } from '@/entities/session';
import { sharedUiComponents } from '@/shared/ui';
import { widgetAccountDataEditorUi } from '@/widgets/account/account-data-editor';

const { Heading, Text, NativeScroll } = sharedUiComponents;
const { Authorized, Guest } = sessionUi;
const { InProgressDeliveriesSlider } = widgetInProgressDeliveriesUi;
const { DeliveriesMarket } = widgetDeliveriesMarketUi;
const { NavbarMobile } = widgetNavbarMobileUi;
const { AccountDataEditor } = widgetAccountDataEditorUi;

const Container: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="flex h-dvh w-full flex-col place-content-end">
        {children}
    </div>
);

export const MobileAuthPageView: FunctionComponent = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const onLoginClick = () => {
        onOpen();
    };

    return (
        <>
            <Container>
                <div className="p-4 text-center ">
                    <div className="flex items-center">
                        <Image
                            alt="NextUI hero Image with delay"
                            src="/icons/logo.png"
                            className="h-full w-full object-cover"
                            radius="none"
                        />
                    </div>
                    <Spacer y={12} />
                    <div className="relative">
                        <Heading size="large" weight="bold">
                            Войдите в профиль
                        </Heading>
                        <Spacer y={1} />
                        <Text as="span" size="small">
                            Чтобы начать работу <br /> и получать новые доставки
                        </Text>
                    </div>
                    <Spacer y={8} />
                    <div className="relative">
                        <Button
                            color="primary"
                            fullWidth
                            size="lg"
                            radius="full"
                            onPress={onLoginClick}
                        >
                            Войти
                        </Button>
                        <Spacer y={4} />
                        <Button
                            variant="light"
                            fullWidth
                            radius="full"
                            onPress={onLoginClick}
                        >
                            Забыли пароль?
                        </Button>
                        <Spacer y={4} />
                    </div>
                </div>
            </Container>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Log in
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Email"
                                    placeholder="Enter your email"
                                    variant="bordered"
                                />
                                <Input
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                    variant="bordered"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    fullWidth
                                    onPress={onClose}
                                >
                                    Sign in
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
