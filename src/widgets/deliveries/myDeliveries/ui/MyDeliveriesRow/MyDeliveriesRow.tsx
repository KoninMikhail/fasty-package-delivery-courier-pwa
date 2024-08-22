import { DeliveryCountdownCard, getDeliveryNumber } from '@/entities/delivery';
import { useList, useUnit } from 'effector-react';
import { sharedUiLayouts } from '@/shared/ui';
import { Button, Skeleton, Spacer, Spinner } from '@nextui-org/react';
import { GoAlert } from 'react-icons/go';
import { AiOutlineReload } from 'react-icons/ai';
import { BsBoxSeam } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { settingsModel } from '@/entities/viewer';

import {
    BUTTON_RETRY_TEXT_KEY,
    DELIVERY_PREFIX,
    ERROR_TEXT_KEY,
    DATA_EMPTY_TEXT_KEY,
    translationNS,
} from '../../config';
import {
    $$empty,
    $$hasError,
    $$inPending,
    $isInitialized,
} from '../../model/model';
import { $myDeliveriesStore } from '../../model/stores';

const { HorizontalScroll } = sharedUiLayouts;

/**
 * Component for rendering horizontally scrollable content.
 */
const ScrollableContent: FunctionComponent<PropsWithChildren> = ({
    children,
}) => (
    <div className="flex flex-nowrap justify-start gap-4 py-4">{children}</div>
);

/**
 * Component rendering a placeholder to indicate no items are available.
 */
const EmptyItemsPlaceholder: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="block p-4">
            <div className="flex h-44 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-content3 p-4">
                <BsBoxSeam className="text-4xl text-content3" />
                <Spacer y={3} />
                <div>
                    <span className="text-center text-lg text-content3">
                        {t(DATA_EMPTY_TEXT_KEY)}
                    </span>
                </div>
            </div>
        </div>
    );
};

/**
 * Renders skeletons as placeholders during loading states.
 */
const Loading: FunctionComponent = () => (
    <div className="block py-4">
        <HorizontalScroll>
            <div className="flex flex-nowrap justify-start gap-4 px-4">
                <Skeleton className="rounded-lg">
                    <div className="h-[175px] w-[300px]" />
                </Skeleton>
                <Skeleton className="rounded-lg">
                    <div className="h-[175px] w-[300px]" />
                </Skeleton>
                <Skeleton className="rounded-lg">
                    <div className="h-[175px] w-[300px]" />
                </Skeleton>
            </div>
        </HorizontalScroll>
    </div>
);

/**
 * Component displaying an error message with a retry button.
 */
const ErrorInitPlaceholder: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="block p-4">
            <div className="flex h-44 w-full flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-content3 p-4">
                <GoAlert className="text-6xl text-content3" />
                <div>
                    <span className="text-content3">{t(ERROR_TEXT_KEY)}</span>
                </div>
                <Spacer y={1} />
                <Button size="sm">
                    <AiOutlineReload />
                    {t(BUTTON_RETRY_TEXT_KEY)}
                </Button>
            </div>
        </div>
    );
};

/**
 * Animates and shows an updating spinner.
 */
const Updater: FunctionComponent = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0, width: 0, marginRight: 0 }}
        animate={{ opacity: 1, scale: 1, width: 'auto', marginRight: 20 }}
        exit={{ opacity: 0, scale: 0, width: 0, marginRight: 0 }}
        transition={{ duration: 0.5 }}
        className="my-auto"
    >
        <Spinner color="primary" />
    </motion.div>
);

/**
 * Main component for displaying a row of deliveries, handling loading, empty, and error states.
 */
export const MyDeliveriesRow: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const itemsLimit = useUnit(settingsModel.$homeUpcomingDeliveriesCount);

    const { isInit, isEmpty, isUpdating, hasError } = useUnit({
        isInit: $isInitialized,
        isEmpty: $$empty,
        isUpdating: $$inPending,
        hasError: $$hasError,
    });

    const items = useList($myDeliveriesStore, (delivery, index) => {
        const deliveryId = getDeliveryNumber(delivery);

        if (index >= itemsLimit) return null;

        return (
            <div className="flex items-end py-1 pl-0.5">
                <div
                    className="-translate-x-2 -translate-y-1.5 rotate-180 text-content4"
                    style={{ writingMode: 'vertical-lr' }}
                >
                    {t(DELIVERY_PREFIX, { id: deliveryId })}
                </div>
                <div className="flex-grow">
                    <DeliveryCountdownCard delivery={delivery} />
                </div>
            </div>
        );
    });

    if (!isInit) return <Loading />;

    if (hasError) return <ErrorInitPlaceholder />;

    if (isEmpty) {
        if (isUpdating) return <Loading />;
        return <EmptyItemsPlaceholder />;
    }

    return (
        <HorizontalScroll className="px-4">
            <AnimatePresence>{isUpdating ? <Updater /> : null}</AnimatePresence>
            <ScrollableContent>{items}</ScrollableContent>
        </HorizontalScroll>
    );
};
