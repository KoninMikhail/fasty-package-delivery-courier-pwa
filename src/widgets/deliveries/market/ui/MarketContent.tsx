import { PropsWithChildren } from 'react';
import { DeliveryMarketCard } from '@/entities/delivery';
import { useList, useUnit } from 'effector-react';
import { Button, Skeleton, Spacer } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { RiWifiOffLine } from 'react-icons/ri';
import { AssignDeliveryWithMe } from '@/features/delivery/assignDeliveryToUser';
import { sessionModel } from '@/entities/viewer';
import { useTranslation } from 'react-i18next';
import { GoAlert } from 'react-icons/go';
import { AiOutlineReload } from 'react-icons/ai';
import { BsBoxSeam } from 'react-icons/bs';
import { InfiniteScroll } from '@/features/other/infinite-scroll';
import { $hasErrors } from '@/shared/services/subway';
import { $outputDeliveriesStore } from '@/widgets/deliveries/market/model/stores';
import {
    InfiniteScrollModel,
    assignDeliveryToUserModel,
    $isDeliveriesLoading,
    $isInitialized,
    $hasNoDeliveries,
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
    const online = useUnit(sessionModel.$$isOnline);
    const viewer = useUnit(sessionModel.$viewerProfileData);

    const { isInit, isPending, hasErrors, isEmpty } = useUnit({
        isInit: $isInitialized,
        isPending: $isDeliveriesLoading,
        hasErrors: $hasErrors,
        isEmpty: $hasNoDeliveries,
    });

    const content = useList($outputDeliveriesStore, (delivery, index) => (
        <EaseIn isFirst={index === 0}>
            <DeliveryMarketCard
                delivery={delivery}
                featureSlot={
                    <AssignDeliveryWithMe.FastAssignRequestButton
                        model={assignDeliveryToUserModel}
                        user={viewer}
                        delivery={delivery}
                    />
                }
            />
        </EaseIn>
    ));

    if (!isInit) return <Loading />;
    if (!online) {
        return <Offline />;
    }
    if (isPending) {
        return <Loading />;
    }
    if (hasErrors) {
        return <Error />;
    }
    if (isEmpty) {
        return <Empty />;
    }
    return (
        <Root>
            <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 5xl:grid-cols-6">
                {content}
            </div>
            <InfiniteScroll.Trigger model={InfiniteScrollModel} />
        </Root>
    );
};
