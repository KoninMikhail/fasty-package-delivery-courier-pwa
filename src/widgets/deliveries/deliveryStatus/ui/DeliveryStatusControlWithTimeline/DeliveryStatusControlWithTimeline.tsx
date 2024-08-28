import { SetDeliveryStatus } from '@/features/delivery/setDeliveryStatus';
import { MdClose, MdOutlineAdd } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { LuUserCheck } from 'react-icons/lu';
import { PropsWithChildren } from 'react';
import { Spacer } from '@nextui-org/react';
import { AssignDeliveryWithMe } from '@/features/delivery/assignDeliveryToUser';
import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { enUS, ru } from 'date-fns/locale';
import {
    STATUS_CREATED,
    STATUS_DELIVERING,
    translationNS as DeliveriesTranslationNS,
    STATUS_DONE,
    STATUS_CANCELLED,
    STATUS_DELIVERING_DESCRIPTION,
    STATUS_CANCELLED_COMMENT,
    STATUS_NO_COMMENT,
    STATUS_DONE_COMMENT,
    getDeliveryStatus,
    getDeliveryComment,
    getDeliverySystemId,
} from '@/entities/delivery';
import { format } from 'date-fns';
import { $delivery } from '../../model/stores';
import { assignToDeliveryModel, setStatusModel } from '../../model/model';
import { LAST_UPDATE_TEXT_KEY, translationNS } from '../../config';

const timeLocales = { en: enUS, ru };

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const Root: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return <div className="grid grid-cols-1 gap-4">{children}</div>;
};

const StatusList: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <div className="pl-5 pt-2">
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
                {children}
            </ol>
        </div>
    );
};

const StatusCreated: FunctionComponent<{
    createDate: Optional<Date>;
}> = ({ createDate }) => {
    const { i18n, t } = useTranslation([DeliveriesTranslationNS]);
    // @ts-expect-error i18n
    const currentLocale = timeLocales[i18n.language] || enUS;

    const createDateFormatted = createDate
        ? format(createDate, 'PPP', { locale: currentLocale })
        : '';

    return (
        <li className="ms-8">
            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                <MdOutlineAdd />
            </span>
            <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-content1-foreground">
                {t(STATUS_CREATED)}
            </h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {createDateFormatted}
            </time>
        </li>
    );
};
const StatusInDelivery: FunctionComponent = () => {
    const { t } = useTranslation([DeliveriesTranslationNS]);
    return (
        <li className="ms-8">
            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                <TbTruckDelivery />
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-content1-foreground">
                {t(STATUS_DELIVERING)}
            </h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {t(STATUS_DELIVERING_DESCRIPTION)}
            </time>
        </li>
    );
};
const StatusDelivered: FunctionComponent<{
    comment: Optional<string>;
}> = ({ comment }) => {
    const { t } = useTranslation([DeliveriesTranslationNS]);
    return (
        <li className="ms-8">
            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                <LuUserCheck />
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-content1-foreground">
                {t(STATUS_DONE)}
            </h3>
            <div className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {comment
                    ? t(STATUS_DONE_COMMENT, {
                          comment,
                      })
                    : t(STATUS_NO_COMMENT)}
            </div>
        </li>
    );
};
const StatusCanceled: FunctionComponent<{
    comment: Optional<string>;
}> = ({ comment }) => {
    const { t } = useTranslation([DeliveriesTranslationNS]);
    return (
        <li className="ms-8">
            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                <MdClose />
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-content1-foreground">
                {t(STATUS_CANCELLED)}
            </h3>
            <div className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                <div>
                    {comment
                        ? t(STATUS_CANCELLED_COMMENT, {
                              comment,
                          })
                        : t(STATUS_NO_COMMENT)}
                </div>
            </div>
        </li>
    );
};

const LastEdited: FunctionComponent<{
    updateDate?: Optional<Date>;
}> = ({ updateDate }) => {
    const { i18n, t } = useTranslation(translationNS);
    // @ts-expect-error i18n
    const currentLocale = timeLocales[i18n.language] || enUS;
    const updateDateFormatted = updateDate
        ? format(updateDate, 'PPP', { locale: currentLocale })
        : 'unknown';
    return (
        <div className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            <div>
                {t(LAST_UPDATE_TEXT_KEY, {
                    date: updateDateFormatted,
                })}
            </div>
        </div>
    );
};

export const DeliveryStatusControlWithTimeline: FunctionComponent = () => {
    const delivery = useUnit($delivery);

    if (!delivery) return null;

    const status = getDeliveryStatus(delivery);
    const deliverySystemId = getDeliverySystemId(delivery);
    const createDate = delivery.createdAt;
    const updateDate = delivery.updatedAt ?? null;
    const comment = getDeliveryComment(delivery);

    if (status === 'created') {
        return (
            <Root>
                <StatusList>
                    <StatusCreated createDate={createDate} />
                </StatusList>
                <AssignDeliveryWithMe.AssignRequestButton
                    model={assignToDeliveryModel}
                    deliverySystemId={deliverySystemId}
                />
            </Root>
        );
    }

    if (status === 'delivering') {
        console.log('delivering');
        return (
            <Root>
                <StatusList>
                    <StatusCreated createDate={createDate} />
                    <Spacer y={4} />
                    <StatusInDelivery />
                </StatusList>
                <LastEdited updateDate={updateDate} />
                <SetDeliveryStatus.ChangeStatusDropdown
                    model={setStatusModel}
                />
            </Root>
        );
    }

    if (status === 'canceled') {
        return (
            <Root>
                <StatusList>
                    <StatusCreated createDate={createDate} />
                    <Spacer y={4} />
                    <StatusInDelivery />
                    <Spacer y={4} />
                    <StatusCanceled comment={comment} />
                </StatusList>
                <LastEdited updateDate={updateDate} />
            </Root>
        );
    }

    if (status === 'done') {
        return (
            <Root>
                <StatusList>
                    <StatusCreated createDate={createDate} />
                    <Spacer y={4} />
                    <StatusInDelivery />
                    <Spacer y={4} />
                    <StatusDelivered comment={comment} />
                </StatusList>
                <LastEdited updateDate={updateDate} />
            </Root>
        );
    }

    return null;
};
