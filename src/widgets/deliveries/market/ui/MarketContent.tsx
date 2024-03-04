import { PropsWithChildren } from 'react';
import { DeliveryShortInfoCard } from '@/entities/delivery';
import { useList, useUnit } from 'effector-react';
import { useNetworkInfo } from '@/shared/config/network';
import { Button, Skeleton, Spacer } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { RiWifiOffLine } from 'react-icons/ri';
import { AssignDeliveryToUser } from '@/features/delivery/assignDeliveryToUser';
import { sessionModel } from '@/entities/viewer';
import { useTranslation } from 'react-i18next';
import { translationNS } from '@/widgets/deliveries/upcommingDeliveries/config';
import { GoAlert } from 'react-icons/go';
import { AiOutlineReload } from 'react-icons/ai';
import { BsBoxSeam } from 'react-icons/bs';
import {
    $$deliveriesEmpty,
    $$hasError,
    $avaliableDeliveries,
    $isDeliveriesLoading,
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
    const { t } = useTranslation(translationNS);
    const messageErrorData = 't(MESSAGE_ERROR_DATA_KEY);';
    const buttonErrorLabelRetry = 't(BUTTON_ERROR_LABEL_RETRY_KEY)';
    return (
        <Root>
            <div className="block p-4">
                <div className="flex h-44 w-full flex-col items-center justify-center gap-1 p-4">
                    <GoAlert className="text-6xl text-content3" />
                    <div>
                        <span className="text-content3">
                            {messageErrorData}
                        </span>
                    </div>
                    <Spacer y={1} />
                    <Button size="sm">
                        <AiOutlineReload />
                        {buttonErrorLabelRetry}
                    </Button>
                </div>
            </div>
        </Root>
    );
};
const Offline: FunctionComponent = () => {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-4 py-8">
            <RiWifiOffLine className="text-5xl text-content3" />
            <div className="text-content3">No internet connection</div>
        </div>
    );
};
const Empty: FunctionComponent = () => {
    return (
        <Root>
            <div className="block p-4">
                <div className="flex h-44 w-full flex-col items-center justify-center p-4">
                    <BsBoxSeam className="text-4xl text-content3" />
                    <Spacer y={3} />
                    <div>
                        <span className="text-lg text-content3">
                            Пока нет доступных доставок
                        </span>
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

    const content = useList($avaliableDeliveries, (delivery, index) => (
        <EaseIn isFirst={index === 0}>
            <DeliveryShortInfoCard
                delivery={delivery}
                featureSlot={
                    <AssignDeliveryToUser.RequestButton
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
    if (hasError) {
        return <Error />;
    }
    if (isEmpty) {
        return <Empty />;
    }
    if (isPending) {
        return <Loading />;
    }
    return (
        <Root>
            <div className="relative grid grid-cols-1 gap-8">{content}</div>
        </Root>
    );
};
