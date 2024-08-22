import { DeliveryMarketCard } from '@/entities/delivery';
import { useList, useUnit } from 'effector-react';
import { Button, Link, Spinner } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LuAlertTriangle } from 'react-icons/lu';
import { BsBoxSeam } from 'react-icons/bs';
import { RiWifiOffLine } from 'react-icons/ri';
import React, { PropsWithChildren, ReactElement, useMemo } from 'react';
import clsx from 'clsx';
import {
    BUTTON_RETRY_TEXT_KEY,
    DATA_EMPTY_TEXT_KEY,
    DATA_PENDING_TEXT_KEY,
    ERROR_NO_INTERNET_TEXT_KEY,
    ERROR_TEXT_KEY,
    translationNS,
} from '../../config';
import {
    $$empty,
    init,
    $$inPending,
    $$hasError,
    $isOnline,
} from '../../model/model';
import { $myDeliveriesStore } from '../../model/stores';

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
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 5xl:grid-cols-6">
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

interface RestartButtonProperties {
    onPress: () => void;
}
const RestartButton: FunctionComponent<RestartButtonProperties> = ({
    onPress,
}) => {
    const { t } = useTranslation(translationNS);
    return (
        <Link as={Button} variant="light" size="sm" onPress={onPress}>
            {t(BUTTON_RETRY_TEXT_KEY)}
        </Link>
    );
};

export const MyDeliveriesList: FunctionComponent = () => {
    const [online, isLoading, hasError, isEmpty, reInit] = useUnit([
        $isOnline,
        $$inPending,
        $$hasError,
        $$empty,
        init,
    ]);

    const items = useList($myDeliveriesStore, (delivery) => (
        <motion.div key={delivery.date} whileTap={{ scale: 0.98 }}>
            <DeliveryMarketCard delivery={delivery} />
        </motion.div>
    ));

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
            case hasError: {
                const onPressReloadButton = (): void => reInit();
                return (
                    <StatusMessage
                        icon={<LuAlertTriangle />}
                        messageKey={ERROR_TEXT_KEY}
                        className="text-warning"
                        endElement={
                            <RestartButton onPress={onPressReloadButton} />
                        }
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
    }, [isLoading, hasError, online, reInit]);

    if (isEmpty) {
        return (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {state}
                <StatusMessage
                    icon={<BsBoxSeam className="text-4xl" />}
                    messageKey={DATA_EMPTY_TEXT_KEY}
                    template="column"
                    className="!h-64 text-content3"
                    classNames={{
                        icon: 'text-5xl',
                    }}
                />
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
