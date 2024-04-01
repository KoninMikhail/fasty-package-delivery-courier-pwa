import { DeliveryMarketCard } from '@/entities/delivery';
import { useList, useUnit } from 'effector-react';
import { Button, Link, Spinner } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LuAlertTriangle } from 'react-icons/lu';
import { BsBoxSeam } from 'react-icons/bs';
import { RiWifiOffLine } from 'react-icons/ri';
import React, { ReactElement, useMemo } from 'react';
import clsx from 'clsx';
import { sharedConfigNetwork } from '@/shared/config';
import { translationNS } from '../../config';
import { $$empty, $deliveriesList, initWidgetMyDeliveries } from '../../model';

import { $$hasError } from '../../model/errorsHandle';
import { $inPending } from '../../model/dataPoling';

const { $networkInfo, $isOnline } = sharedConfigNetwork;

const TRANSLATIONS = {
    PENDING_KEY: 'widget.pending',
    ERROR_KEY: 'widget.error',
    EMPTY_KEY: 'data.empty',
    ERROR_UPDATE_KEY: 'error.buttonRetry.label',
    NO_INTERNET_KEY: 'error.noInternet',
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
            {t(TRANSLATIONS.ERROR_UPDATE_KEY)}
        </Link>
    );
};

export const MyDeliveriesList: FunctionComponent = () => {
    const [isLoading, hasError, isEmpty, isOnline] = useUnit([
        $inPending,
        $$hasError,
        $$empty,
        $isOnline,
    ]);
    const reloadWidget = useUnit(initWidgetMyDeliveries);

    const items = useList($deliveriesList, (delivery) => (
        <motion.div key={delivery.date} whileTap={{ scale: 0.9 }}>
            <DeliveryMarketCard delivery={delivery} />
        </motion.div>
    ));

    const widgetState = useMemo(() => {
        const onPressReloadButton = (): void => {
            reloadWidget();
        };

        if (isLoading)
            return (
                <StatusMessage
                    icon={<Spinner size="sm" color="primary" />}
                    messageKey={TRANSLATIONS.PENDING_KEY}
                    className="py-4"
                />
            );
        if (hasError)
            return (
                <StatusMessage
                    icon={<LuAlertTriangle />}
                    messageKey={TRANSLATIONS.ERROR_KEY}
                    className="text-warning"
                    endElement={<RestartButton onPress={onPressReloadButton} />}
                />
            );
        if (!isOnline)
            return (
                <StatusMessage
                    icon={<RiWifiOffLine />}
                    messageKey={TRANSLATIONS.NO_INTERNET_KEY}
                    className="pt-2 text-warning"
                />
            );
        return null;
    }, [isLoading, hasError, isOnline, reloadWidget]);

    if (isEmpty) {
        return (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {widgetState}
                <StatusMessage
                    icon={<BsBoxSeam className="text-4xl" />}
                    messageKey={TRANSLATIONS.EMPTY_KEY}
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
        <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {widgetState}
                <AnimatePresence>{items}</AnimatePresence>
            </div>
        </div>
    );
};
