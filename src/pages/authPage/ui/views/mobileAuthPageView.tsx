import { PropsWithChildren } from 'react';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
    useDisclosure,
    Image,
    ModalProps,
    Link,
} from '@nextui-org/react';
import { sharedUiComponents } from '@/shared/ui';
import { ImKey } from 'react-icons/im';
import { Greetings } from '../common';

const { Heading, Text } = sharedUiComponents;

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="h-dvh w-full">
        <div className="absolute inset-0 h-full w-full bg-[url('/assets/images/auth_bg.jpg')] bg-cover bg-[left_-10rem_top] md:bg-center">
            <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-background from-45% to-transparent" />
            <div className="grid h-full w-full grid-cols-1 grid-rows-[auto_max-content]">
                {children}
            </div>
        </div>
    </div>
);
const Section: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="relative mx-auto w-full max-w-[400px] p-4">{children}</div>
);

/**
 * Components
 */
const LoginToAccountButton: FunctionComponent<{
    label: string;
    onPress: () => void;
}> = ({ label, onPress }) => (
    <Button color="primary" fullWidth size="lg" radius="full" onPress={onPress}>
        <ImKey /> {label}
    </Button>
);
const ResetPasswordButton: FunctionComponent<{
    label: string;
    onPress: () => void;
}> = ({ label, onPress }) => (
    <Button fullWidth size="lg" radius="full" onPress={onPress}>
        {label}
    </Button>
);

const ResetPasswordModal: FunctionComponent<Omit<ModalProps, 'children'>> = ({
    isOpen,
    onOpenChange,
}) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Сброс пароля
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                variant="flat"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <div className="w-full">
                                <Button
                                    color="primary"
                                    fullWidth
                                    onPress={onClose}
                                >
                                    Сброс пароля
                                </Button>
                                <Spacer y={8} />
                            </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

const LoginModal: FunctionComponent<Omit<ModalProps, 'children'>> = ({
    isOpen,
    onOpenChange,
}) => {
    return (
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
                                variant="flat"
                            />
                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                variant="flat"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <div>
                                <Button
                                    color="primary"
                                    fullWidth
                                    onPress={onClose}
                                >
                                    Авторизоваться
                                </Button>
                                <Spacer y={8} />
                                <Text size="small">
                                    Пролождая авторацию вы соглашаетесь с
                                    <Link size="sm">
                                        политикой конфиденциальности
                                    </Link>
                                    ,
                                    <Link size="sm">
                                        условиями использования
                                    </Link>{' '}
                                    и<Link size="sm">политикой cookie</Link>
                                </Text>
                                <Spacer y={2} />
                            </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

/**
 * @name MobileAuthPageView
 * @constructor
 */
export const MobileAuthPageView: FunctionComponent = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const {
        isOpen: isOpenForgot,
        onOpen: onOpenForgot,
        onOpenChange: onOpenChangeForgot,
    } = useDisclosure();

    const onPressLogin = (): void => {
        onOpen();
    };

    const onPressResetPassword = (): void => {
        onOpenForgot();
    };

    return (
        <>
            <Layout>
                <Section>
                    <div className="flex place-content-start items-center gap-2">
                        <Image
                            width={60}
                            alt="NextUI hero Image"
                            src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                        />
                        <div>
                            <Text weight="bold">Fasty</Text>
                            <Text as="span" size="small">
                                Business app for couriers
                            </Text>
                        </div>
                    </div>
                </Section>
                <Section>
                    <Greetings
                        heading="Добро пожаловать"
                        description="Войдите в свой профиль для того чтобы начать работу и получать новые доставки"
                    />
                    <Spacer y={8} />
                    <LoginToAccountButton
                        label="Войти в аккаунт"
                        onPress={onPressLogin}
                    />
                    <Spacer y={2} />
                    <ResetPasswordButton
                        label="Восстановить пароль"
                        onPress={onPressResetPassword}
                    />
                    <Spacer y={1} />
                </Section>
            </Layout>
            <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
            <ResetPasswordModal
                isOpen={isOpenForgot}
                onOpenChange={onOpenChangeForgot}
            />
        </>
    );
};
