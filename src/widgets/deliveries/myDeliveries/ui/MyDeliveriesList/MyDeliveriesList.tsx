import { DeliveryMarketCard } from '@/entities/delivery';
import { useList, useUnit } from 'effector-react';
import { Spinner } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { RiWifiOffLine } from 'react-icons/ri';
import React, { PropsWithChildren, ReactElement, useMemo } from 'react';
import clsx from 'clsx';
import { DetectNetworkConnectionState } from '@/features/device/detectNetworkConnectionState';
import { NoDeliveries } from '@/widgets/deliveries/myDeliveries/ui/common/NoDeliveries';
import {
    DATA_PENDING_TEXT_KEY,
    ERROR_NO_INTERNET_TEXT_KEY,
    translationNS,
} from '../../config';
import {
    $$empty,
    init,
    $$inPending,
    filteredDeliveriesByTimeModel,
} from '../../model/model';

export const {
    model: { $$isOnline },
} = DetectNetworkConnectionState;

const Root: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return <div className="grid grid-cols-1 gap-4">{children}</div>;
};

const Headline: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex items-center justify-center gap-4">{children}</div>
    );
};

const Content: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 5xl:grid-cols-6">
            {children}
        </div>
    );
};

interface StatusMessageProperties {
    icon: ReactElement;
    messageKey: string;
    classNames?: {
        icon?: string;
        text?: string;
        button?: string;
    };
    className?: string;
    template?: 'row' | 'column';
    endElement?: ReactElement;
}

const StatusMessage: FunctionComponent<StatusMessageProperties> = ({
    icon,
    messageKey,
    className,
    classNames,
    template = 'row',
    endElement,
}) => {
    const { t } = useTranslation(translationNS);
    return (
        <div
            className={clsx(
                {
                    'flex w-full items-center justify-center gap-4 py-2 text-center':
                        template === 'row',
                    'flex h-36 w-full flex-col items-center justify-center gap-4 py-2':
                        template === 'column',
                },
                className,
            )}
        >
            {React.cloneElement(icon, {
                className: classNames?.icon || 'text-xl',
            })}
            <span className={classNames?.text}>{t(messageKey)}</span>
            {endElement}
        </div>
    );
};

export const MyDeliveriesList: FunctionComponent = () => {
    const [online, isLoading, isEmpty, reInit] = useUnit([
        $$isOnline,
        $$inPending,
        $$empty,
        init,
    ]);

    const items = useList(
        filteredDeliveriesByTimeModel.$filteredDeliveries,
        (delivery) => {
            return (
                <motion.div key={delivery.id} whileTap={{ scale: 0.98 }}>
                    <DeliveryMarketCard delivery={delivery} />
                </motion.div>
            );
        },
    );

    const state = useMemo(() => {
        switch (true) {
            case isLoading: {
                return (
                    <StatusMessage
                        icon={<Spinner size="sm" color="primary" />}
                        messageKey={DATA_PENDING_TEXT_KEY}
                        className="py-4"
                    />
                );
            }
            case !online: {
                return (
                    <StatusMessage
                        icon={<RiWifiOffLine />}
                        messageKey={ERROR_NO_INTERNET_TEXT_KEY}
                        className="pt-2 text-warning"
                    />
                );
            }
            default: {
                return null;
            }
        }
    }, [isLoading, online, reInit]);

    if (isEmpty) {
        return (
            <div className="grid grid-cols-1 gap-4 py-6 lg:py-12">
                {state}
                <NoDeliveries />
            </div>
        );
    }

    return (
        <Root>
            <Headline>{state}</Headline>
            <Content>
                <AnimatePresence>{items}</AnimatePresence>
            </Content>
        </Root>
    );
};
