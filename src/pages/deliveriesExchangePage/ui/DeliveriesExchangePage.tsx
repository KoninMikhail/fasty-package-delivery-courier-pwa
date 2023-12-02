import type { PropsWithChildren, ReactNode } from 'react';

import { SwitchTheme } from '@/features/switchTheme';

import { widgetDeliveriesBoardUi } from '@/widgets/deliveries-board';
import { widgetAccountDeliveriesUi } from '@/widgets/account-deliveries';
import { AccountUi } from '@/entities/account';
import {
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from '@nextui-org/react';

const { DeliveriesBoard } = widgetDeliveriesBoardUi;
const { AccountDeliveries } = widgetAccountDeliveriesUi;
const { AccountCardRow } = AccountUi;

interface ISectionWithTitleProperties {
    title: string;
    featureSlot?: ReactNode | ReactNode[];
}
const SectionWithTitle: FunctionComponent<
    PropsWithChildren<ISectionWithTitleProperties>
> = ({ children, title, featureSlot }) => {
    return (
        <div className="flex flex-col gap-4 overflow-visible">
            <div className="grid grid-cols-[auto_max-content]">
                <div>
                    <h3 className="px-2 text-2xl font-semibold leading-none text-default-600">
                        {title}
                    </h3>
                </div>
                <div>{featureSlot}</div>
            </div>

            <div className="p-2">{children}</div>
        </div>
    );
};

/**
 * @name DeliveriesExchangePage
 * @description Page for deliveries exchange
 * @constructor
 */
export const DeliveriesExchangePage: FunctionComponent = () => {
    return (
        <div className="flex h-full w-full gap-4">
            <div className="block">
                <Navbar position="static">
                    <NavbarBrand className="justify-self-start">
                        <p className="font-bold text-inherit">ACME</p>
                    </NavbarBrand>
                    <NavbarContent
                        className="hidden gap-4 sm:flex"
                        justify="center"
                    >
                        <NavbarItem isActive>
                            <Link href="#" aria-current="page">
                                Список доставок
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link color="foreground" href="#">
                                Карта
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link color="foreground" href="#">
                                Профиль
                            </Link>
                        </NavbarItem>
                    </NavbarContent>
                    <NavbarContent justify="end">
                        <NavbarItem>
                            <AccountCardRow
                                account={{
                                    name: 'John Doe',
                                    email: 'johnDoe@test.com',
                                    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026708c',
                                    deliveries: {
                                        delivered: 12,
                                        inTransit: 12,
                                        pending: 12,
                                    },
                                }}
                                size="md"
                                avatarPosition="right"
                            />
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
                <div className="px-6">
                    <SwitchTheme />
                    <SectionWithTitle
                        title="Ваши доставки"
                        featureSlot={
                            <Link color="foreground" href="#">
                                Посмотреть все
                            </Link>
                        }
                    >
                        <AccountDeliveries template="horizontal" />
                    </SectionWithTitle>
                    <SectionWithTitle title="Доступные заказы">
                        <DeliveriesBoard />
                    </SectionWithTitle>
                </div>
            </div>
            <div className="fixed right-0 hidden h-full w-4/12 xl:block">
                <div className="h-full rounded-l-2xl bg-white shadow-2xl">
                    dfgdfg
                </div>
            </div>
            <div className="shadow-3xl fixed bottom-0 z-40 block w-screen overflow-hidden rounded-t-3xl bg-white p-6 xl:hidden">
                sdfsd
            </div>
        </div>
    );
};
