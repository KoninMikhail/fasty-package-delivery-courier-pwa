import { PropsWithChildren } from 'react';
import { DeliveryMarketCard } from '@/entities/delivery';
import { useList, useUnit } from 'effector-react';
import { useNetworkInfo } from '@/shared/config/network';
import { Button, Skeleton, Spacer } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { RiWifiOffLine } from 'react-icons/ri';
import { AssignDeliveryToUser } from '@/features/delivery/assignDeliveryToUser';
import { sessionModel } from '@/entities/viewer';
import { useTranslation } from 'react-i18next';
import { GoAlert } from 'react-icons/go';
import { AiOutlineReload } from 'react-icons/ai';
import { BsBoxSeam } from 'react-icons/bs';
import {
    $$deliveriesEmpty,
    $$hasError,
    $isDeliveriesLoading,
    $outputStore,
    assignDeliveryToUserModel,
} from '../model';

/* eslint-disable unicorn/consistent-function-scoping */

/**
 * Layout
 */
const Root: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="flex w-full flex-col gap-6 pb-24">{children}</div>
);
const EaseIn: FunctionComponent<PropsWithChildren & { isFirst: boolean }> = ({
    children,
    isFirst,
}) => (
    <motion.div
        className="relative w-full"
        initial={{
            opacity: 0,
            scale: isFirst ? 1 : 0.95,
        }}
        whileInView={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3, delay: 0.08 },
        }}
        viewport={{ once: true }}
    >
        {children}
    </motion.div>
);

/**
 * Components
 */
const Loading: FunctionComponent = () => {
    return (
        <Root>
            <div className="flex w-full flex-col items-center justify-center gap-4">
                <Skeleton className="w-full rounded-lg">
                    <div className="h-48 min-w-full rounded-lg bg-default-300" />
                </Skeleton>
                <Skeleton className="w-full rounded-lg">
                    <div className="block h-48 min-w-full" />
                </Skeleton>
                <Skeleton className="w-full rounded-lg">
                    <div className="block h-48 w-full min-w-full" />
                </Skeleton>
            </div>
        </Root>
    );
};
const Error: FunctionComponent = () => {
    const { t } = useTranslation();
    return (
        <Root>
            <div className="block p-4">
                <div className="flex h-44 w-full flex-col items-center justify-center gap-1 p-4">
                    <GoAlert className="text-6xl text-content3" />
                    <div className="text-content3">
                        {t('MESSAGE_ERROR_DATA_KEY')}
                    </div>
                    <Spacer y={1} />
                    <Button size="sm">
                        <AiOutlineReload />
                        {t('BUTTON_ERROR_LABEL_RETRY_KEY')}
                    </Button>
                </div>
            </div>
        </Root>
    );
};
const Offline: FunctionComponent = () => {
    return (
        <div className="block p-4">
            <div className="flex h-56 w-full flex-col items-center justify-center gap-4 pb-24">
                <RiWifiOffLine className="text-5xl text-content3" />
                <div className="text-content3">No internet connection</div>
            </div>
        </div>
    );
};
const Empty: FunctionComponent = () => {
    return (
        <Root>
            <div className="block p-4">
                <div className="flex h-56 w-full flex-col items-center justify-center gap-4 p-4 pb-24">
                    <BsBoxSeam className="text-5xl text-content3" />
                    <div className="w-full text-center text-content3">
                        Пока нет доступных доставок
                    </div>
                </div>
            </div>
        </Root>
    );
};

/**
 * @name MarketContent
 * @description widget for display available deliveries
 * @constructor
 */
export const MarketContent: FunctionComponent = () => {
    const { online } = useNetworkInfo();
    const viewer = useUnit(sessionModel.$sessionStore);

    const [isPending, hasError, isEmpty] = useUnit([
        $isDeliveriesLoading,
        $$hasError,
        $$deliveriesEmpty,
    ]);

    const content = useList($outputStore, (delivery, index) => (
        <EaseIn isFirst={index === 0}>
            <DeliveryMarketCard
                delivery={delivery}
                featureSlot={
                    <AssignDeliveryToUser.FastAssignRequestButton
                        model={assignDeliveryToUserModel}
                        user={viewer}
                        delivery={delivery}
                    />
                }
            />
        </EaseIn>
    ));

    if (!online) {
        return <Offline />;
    }
    if (isPending) {
        return <Loading />;
    }
    if (hasError) {
        return <Error />;
    }
    if (isEmpty) {
        return <Empty />;
    }
    return (
        <Root>
            <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2">
                {content}
            </div>
        </Root>
    );
};
