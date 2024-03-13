import { DeliveryCountdownCard } from '@/entities/delivery/ui';
import { useList, useUnit } from 'effector-react';
import { sharedUiLayouts } from '@/shared/ui';
import { Button, Skeleton, Spacer, Spinner } from '@nextui-org/react';
import { GoAlert } from 'react-icons/go';
import { AiOutlineReload } from 'react-icons/ai';
import { BsBoxSeam } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import {
    $$empty,
    $$hasError,
    $$upcomingDeliveriesLimited,
    $isFirstLoad,
    $loading,
} from '../../model';

import { translationNS } from '../../config';

const { HorizontalScroll } = sharedUiLayouts;

/**
 * Сonstants
 */

const MESSAGE_ERROR_EMPTY_KEY = 'message.error.empty';
const MESSAGE_ERROR_DATA_KEY = 'message.error.data';
const BUTTON_ERROR_LABEL_RETRY_KEY = 'button.error.label.retry';

/**
 * Components
 */
const EmptyBanner: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const messageErrorEmpty = t(MESSAGE_ERROR_EMPTY_KEY);
    return (
        <div className="block p-4">
            <div className="flex h-44 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed p-4">
                <BsBoxSeam className="text-4xl text-content3" />
                <Spacer y={3} />
                <div>
                    <span className="text-center text-lg text-content3">
                        {messageErrorEmpty}
                    </span>
                </div>
            </div>
        </div>
    );
};
const SkeletonsBoard: FunctionComponent = () => {
    return (
        <div className="block py-4">
            <HorizontalScroll>
                <div className="flex flex-nowrap justify-start gap-4 px-4">
                    <Skeleton className="rounded-lg">
                        <DeliveryCountdownCard />
                    </Skeleton>
                    <Skeleton className="rounded-lg">
                        <DeliveryCountdownCard />
                    </Skeleton>
                    <Skeleton className="rounded-lg">
                        <DeliveryCountdownCard />
                    </Skeleton>
                </div>
            </HorizontalScroll>
        </div>
    );
};
const ErrorBanner: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const messageErrorData = t(MESSAGE_ERROR_DATA_KEY);
    const buttonErrorLabelRetry = t(BUTTON_ERROR_LABEL_RETRY_KEY);
    return (
        <div className="block p-4">
            <div className="flex h-44 w-full flex-col items-center justify-center gap-1 rounded-xl  border-2 border-dashed p-4">
                <GoAlert className="text-6xl text-content3" />
                <div>
                    <span className="text-content3">{messageErrorData}</span>
                </div>
                <Spacer y={1} />
                <Button size="sm">
                    <AiOutlineReload />
                    {buttonErrorLabelRetry}
                </Button>
            </div>
        </div>
    );
};
const Updater: FunctionComponent = () => {
    return (
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
};

/**
 * View
 */
export const UpcomingDeliveriesScroller: FunctionComponent = () => {
    const [isUpdating, isFirstLoad] = useUnit([$loading, $isFirstLoad]);
    const isEmpty = useUnit($$empty);
    const hasError = useUnit($$hasError);

    const items = useList($$upcomingDeliveriesLimited, (delivery) => (
        <DeliveryCountdownCard delivery={delivery} />
    ));

    if (hasError && isEmpty) {
        return <ErrorBanner />;
    }

    if (isFirstLoad) {
        return <SkeletonsBoard />;
    }

    if (isEmpty) {
        return <EmptyBanner />;
    }

    return (
        <HorizontalScroll className="px-4">
            <AnimatePresence>{isUpdating ? <Updater /> : null}</AnimatePresence>
            <div className="flex flex-nowrap justify-start gap-4 py-4">
                {items}
            </div>
        </HorizontalScroll>
    );
};
