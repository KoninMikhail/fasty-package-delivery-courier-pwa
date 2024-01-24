import type { PropsWithChildren, ReactNode } from 'react';
import { sharedUiComponents } from '@/shared/ui';
import { Button, Input, Spacer, Divider } from '@nextui-org/react';
import Logo from '@/pages/authPage/ui/common/Logo';
import { ImKey } from 'react-icons/im';
import { Greetings } from '../common';

const { Heading, Text } = sharedUiComponents;

const Wrapper: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="h-screen w-screen">
        <div className="absolute inset-0 h-full w-full bg-[url('/assets/images/auth_bg.jpg')] bg-cover bg-left md:bg-center">
            {children}
        </div>
    </div>
);
const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="grid h-full w-full grid-cols-2 gap-4">{children}</div>
);
const Hero: FunctionComponent<{ logo: ReactNode; copyright: ReactNode }> = ({
    logo,
    copyright,
}) => (
    <div className="relative block h-full w-full">
        <div className="absolute left-0 top-0 block p-8">{logo}</div>
        <div className="absolute bottom-0 left-0 block p-8">{copyright}</div>
    </div>
);
const Content: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="relative ml-auto w-full rounded-l-3xl bg-content1 p-8 shadow-2xl">
        <div className="mx-auto flex h-full w-full flex-col items-center justify-center xl:w-1/2 ">
            {children}
        </div>
    </div>
);

export const DesktopAuthPageView: FunctionComponent = () => {
    return (
        <Wrapper>
            <Layout>
                <Hero
                    logo={<Logo />}
                    copyright={
                        <Text as="span" size="large">
                            {new Date().getFullYear()} © asdasdsd
                        </Text>
                    }
                />
                <Content>
                    <div />
                    <div className="flex w-full flex-col gap-4">
                        <Greetings
                            heading="C возвращением!"
                            description="Войдите в свой профиль для того чтобы начать работу и получать новые доставки"
                            align="center"
                        />
                        <Spacer y={4} />
                        <Input
                            label="Email"
                            size="lg"
                            fullWidth
                            placeholder="Enter your email"
                            variant="flat"
                        />
                        <Input
                            label="Password"
                            size="lg"
                            fullWidth
                            placeholder="Enter your password"
                            type="password"
                            variant="flat"
                        />
                        <Button color="primary" fullWidth size="lg">
                            <ImKey /> Авторизоваться
                        </Button>
                        <Spacer y={2} />
                        <Divider />
                        <Spacer y={2} />
                        <Button fullWidth size="lg" variant="bordered">
                            Восстановить пароль
                        </Button>
                    </div>
                </Content>
            </Layout>
        </Wrapper>
    );
};
