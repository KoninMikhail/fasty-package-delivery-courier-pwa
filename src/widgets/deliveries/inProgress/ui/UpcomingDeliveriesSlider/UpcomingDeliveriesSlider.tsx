import { DeliveryCountdownCard } from '@/entities/delivery/ui';
import { useList, useUnit } from 'effector-react';
import { sharedUiLayouts } from '@/shared/ui';
import { Button, Skeleton, Spacer } from '@nextui-org/react';
import { GoAlert } from 'react-icons/go';
import { sharedConfigLocale } from '@/shared/config';
import { AiOutlineReload } from 'react-icons/ai';
import { BsBoxSeam } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import {
    $$empty,
    $$hasError,
    $$loading,
    $inProgressDeliveries,
} from '../../model';

import { translationNS } from '../../config';
import locale_ru from '../../locales/ru.locale.json';
import locale_en from '../../locales/en.locale.json';

const { HorizontalScroll } = sharedUiLayouts;
const { locale } = sharedConfigLocale;

/**
 * locale
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * Сonstants
 */

const MESSAGE_ERROR_EMPTY_KEY = 'message.error.empty';
const MESSAGE_ERROR_DATA_KEY = 'message.error.data';
const BUTTON_ERROR_LABEL_RETRY_KEY = 'button.error.label.retry';

/**
 * Components
 */
const EmptyState: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const messageErrorEmpty = t(MESSAGE_ERROR_EMPTY_KEY);
    return (
        <div className="block p-4">
            <div className="flex h-44 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed p-4">
                <BsBoxSeam className="text-4xl text-content3" />
                <Spacer y={3} />
                <div>
                    <span className="text-lg text-content3">
                        {messageErrorEmpty}
                    </span>
                </div>
            </div>
        </div>
    );
};

const LoadingState: FunctionComponent = () => {
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

const ErrorState: FunctionComponent = () => {
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

/**
 * View
 */
export const UpcomingDeliveriesSlider: FunctionComponent = () => {
    const isLoading = useUnit($$loading);
    const isEmpty = useUnit($$empty);
    const hasError = useUnit($$hasError);
    const items = useList($inProgressDeliveries, (delivery) => (
        <DeliveryCountdownCard delivery={delivery} />
    ));

    if (hasError) {
        return <ErrorState />;
    }

    if (isLoading && isEmpty) {
        return <LoadingState />;
    }

    if (isEmpty) {
        return <EmptyState />;
    }
    return (
        <HorizontalScroll className="px-4">
            <div className="flex flex-nowrap justify-start gap-4 py-4">
                {items}
            </div>
        </HorizontalScroll>
    );
};
