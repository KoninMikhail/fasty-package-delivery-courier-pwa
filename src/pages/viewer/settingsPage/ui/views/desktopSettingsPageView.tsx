import type { PropsWithChildren } from 'react';
import { widgetNavbarDesktopUi } from '@/widgets/layout/navbar-desktop';
import { useUnit } from 'effector-react';
import { UserCardRow } from '@/entities/user';
import { sessionModel } from '@/entities/viewer';
import { Button, Divider, Image, Spacer } from '@nextui-org/react';
import { User } from '@/shared/api';
import { SlSocialVkontakte } from 'react-icons/sl';
import { IoLogoYoutube } from 'react-icons/io';
import { Section } from '@/shared/ui/layouts';

const { Navbar } = widgetNavbarDesktopUi;

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="grid h-screen w-screen grid-cols-[max-content_auto] gap-8">
        {children}
    </div>
);

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col">{children}</main>
);

const Toolbar: FunctionComponent<{ header: string; user: User }> = ({
    header,
    user,
}) => {
    return (
        <div className="flex w-full items-center justify-between py-6 pr-4">
            <div className="w-1/2">
                <h1 className="text-4xl capitalize">{header}</h1>
            </div>
            <div>
                <UserCardRow user={user} avatarPosition="right" />
            </div>
        </div>
    );
};

export const DesktopSettingsPageView: FunctionComponent<{ header: string }> = ({
    header,
}) => {
    const user = useUnit(sessionModel.$viewerProfileData);
    return (
        <Layout>
            <Navbar />
            <MainContainer>
                <Toolbar header={header} user={user} />
                <div className="flex w-full px-8">
                    <div className="h-72 flex-grow">
                        <div className="h-96" />
                    </div>
                    <Divider orientation="vertical" className="mx-8" />
                    <div className="h-72 flex-grow">
                        <Section>
                            <div className="flex items-center justify-center gap-2">
                                <Image
                                    width={180}
                                    src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                                    alt="NextUI Album Cover"
                                    className="m-5"
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
                        <div>
                            Равным образом дальнейшее развитие различных форм
                            деятельности в значительной степени обуславливает
                            создание форм развития. Значимость этих проблем
                            настолько очевидна, что консультация с широким
                            активом позволяет оценить значение направлений
                            прогрессивного развития. Задача организации, в
                            особенности же начало повседневной работы по
                            формированию позиции позволяет выполнять важные
                            задания по разработке новых предложений.
                        </div>
                    </div>
                </div>
            </MainContainer>
        </Layout>
    );
};
