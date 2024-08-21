import { PropsWithChildren } from 'react';
import { DeliveryMarketCard } from '@/entities/delivery';
import { useList, useUnit } from 'effector-react';
import { Skeleton } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { RiWifiOffLine } from 'react-icons/ri';
import { AssignDeliveryWithMe } from '@/features/delivery/assignDeliveryToUser';
import { BsBoxSeam } from 'react-icons/bs';
import { InfiniteScroll } from '@/features/other/infinite-scroll';
import { useTranslation } from 'react-i18next';
import { LABEL_NO_DELIVERIES, LABEL_OFFLINE, translationNS } from '../config';
import { $outputDeliveriesStore } from '../model/stores';
import {
    InfiniteScrollModel,
    assignDeliveryToUserModel,
    $isDeliveriesLoading,
    $isInitialized,
    $hasNoDeliveries,
    $isFirstPage,
    $isOnline,
} from '../model';

/* eslint-disable unicorn/consistent-function-scoping */

/**
 * Layout
 */
const Root: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="flex w-full flex-col gap-6 pb-36">{children}</div>
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

const Offline: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="block p-4">
            <div className="flex h-56 w-full flex-col items-center justify-center gap-4 pb-24">
                <RiWifiOffLine className="text-5xl text-content3" />
                <div className="text-content3">{t(LABEL_OFFLINE)}</div>
            </div>
        </div>
    );
};
const Empty: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <Root>
            <div className="block p-4">
                <div className="flex h-56 w-full flex-col items-center justify-center gap-4 p-4 pb-24">
                    <BsBoxSeam className="text-5xl text-content3" />
                    <div className="w-full text-center text-content3">
                        {t(LABEL_NO_DELIVERIES)}
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
    const { isInit, isOnline, isPending, isEmpty, isFirstPage } = useUnit({
        isInit: $isInitialized,
        isOnline: $isOnline,
        isPending: $isDeliveriesLoading,
        isEmpty: $hasNoDeliveries,
        isFirstPage: $isFirstPage,
    });

    const content = useList($outputDeliveriesStore, (delivery, index) => (
        <EaseIn isFirst={index === 0}>
            <DeliveryMarketCard
                delivery={delivery}
                featureSlot={
                    <AssignDeliveryWithMe.FastAssignRequestButton
                        model={assignDeliveryToUserModel}
                        deliverySystemId={delivery.id}
                        deliveryId={delivery.deliveryId}
                    />
                }
            />
        </EaseIn>
    ));

    if (!isInit) return <Loading />;
    if (!isOnline) return <Offline />;
    if (isPending && isFirstPage) return <Loading />;
    if (isEmpty) return <Empty />;

    const paginationAllowed = isInit && !isPending && !isEmpty;

    return (
        <Root>
            <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 5xl:grid-cols-6">
                {content}
            </div>
            <InfiniteScroll.Trigger
                model={InfiniteScrollModel}
                allowed={paginationAllowed}
            />
            <InfiniteScroll.Spinner model={InfiniteScrollModel} />
        </Root>
    );
};
