import { DeliveryCountdownCard, getDeliveryNumber } from '@/entities/delivery';
import { useList, useUnit } from 'effector-react';
import { sharedUiLayouts } from '@/shared/ui';
import { Spinner } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { settingsModel } from '@/entities/viewer';

import { NoDeliveries } from '@/widgets/deliveries/myDeliveries/ui/common/NoDeliveries';
import { DELIVERY_PREFIX, translationNS } from '../../config';
import { $$empty, $$inPending, $isInitialized } from '../../model/model';
import { $myDeliveriesStoreSorted } from '../../model/stores';
import { Loading } from '../common/Loading';

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
 * Main component for displaying a row of deliveries, handling Loading, empty, and error states.
 */
export const MyDeliveriesRow: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const itemsLimit = useUnit(settingsModel.$homeUpcomingDeliveriesCount);

    const { isInit, isEmpty, isUpdating } = useUnit({
        isInit: $isInitialized,
        isEmpty: $$empty,
        isUpdating: $$inPending,
    });

    const items = useList($myDeliveriesStoreSorted, (delivery, index) => {
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

    /* if (hasError) return <ErrorInitPlaceholder />;
     */
    if (isEmpty) {
        if (isUpdating) return <Loading />;
        return (
            <NoDeliveries
                classNames={{
                    container: 'block px-4',
                }}
            />
        );
    }

    return (
        <HorizontalScroll className="px-4">
            <AnimatePresence>{isUpdating ? <Updater /> : null}</AnimatePresence>
            <ScrollableContent>{items}</ScrollableContent>
        </HorizontalScroll>
    );
};
