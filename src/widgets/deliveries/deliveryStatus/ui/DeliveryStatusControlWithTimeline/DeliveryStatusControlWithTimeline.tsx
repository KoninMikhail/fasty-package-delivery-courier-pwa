import { SetDeliveryStatus } from '@/features/delivery/setDeliveryStatus';
import { MdClose, MdOutlineAdd } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { LuUserCheck } from 'react-icons/lu';
import { PropsWithChildren } from 'react';
import { Spacer } from '@nextui-org/react';
import { AssignDeliveryToUser } from '@/features/delivery/assignDeliveryToUser';
import { useUnit } from 'effector-react';
import { sessionModel } from '@/entities/viewer';
import { useTranslation } from 'react-i18next';
import { enUS, ru } from 'date-fns/locale';
import { format } from 'date-fns';
import {
    $$deliveryComment,
    $$deliveryCreateDate,
    $$deliveryStatus,
    $$deliveryUpdateDate,
    assignToDeliveryModel,
    setStatusModel,
} from '../../model';

const timeLocales = { en: enUS, ru };

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const Root: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    );
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
    createDate?: Date;
}> = ({ createDate }) => {
    const { i18n } = useTranslation();
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
                Создан
            </h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {createDateFormatted}
            </time>
        </li>
    );
};
const StatusInDelivery: FunctionComponent = () => {
    return (
        <li className="ms-8">
            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                <TbTruckDelivery />
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-content1-foreground">
                В доставке
            </h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                Заказ находится у курьера
            </time>
        </li>
    );
};
const StatusDelivered: FunctionComponent<{ updateDate?: Date }> = ({
    updateDate,
}) => {
    const { i18n } = useTranslation();
    // @ts-expect-error i18n
    const currentLocale = timeLocales[i18n.language] || enUS;
    const updateDateFormatted = updateDate
        ? format(updateDate, 'PPP', { locale: currentLocale })
        : 'неизвестно';
    return (
        <li className="ms-8">
            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                <LuUserCheck />
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-content1-foreground">
                Доставлен
            </h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {`Последнее изменение: ${updateDateFormatted}`}
            </time>
        </li>
    );
};
const StatusCanceled: FunctionComponent<{ updateDate?: Date }> = ({
    updateDate,
}) => {
    const { i18n } = useTranslation();
    // @ts-expect-error i18n
    const currentLocale = timeLocales[i18n.language] || enUS;
    const updateDateFormatted = updateDate
        ? format(updateDate, 'PPP', { locale: currentLocale })
        : 'неизвестно';
    return (
        <li className="ms-8">
            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                <MdClose />
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-content1-foreground">
                Отмена
            </h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {`Последнее изменение: ${updateDateFormatted}`}
            </time>
        </li>
    );
};

export const DeliveryStatusControlWithTimeline: FunctionComponent = () => {
    const status = useUnit($$deliveryStatus);
    const createDate = useUnit($$deliveryCreateDate);
    const updateDate = useUnit($$deliveryUpdateDate);
    const comment = useUnit($$deliveryComment);
    const user = useUnit(sessionModel.$sessionStore);

    if (status === 'created') {
        return (
            <Root>
                <StatusList>
                    <StatusCreated createDate={createDate} />
                </StatusList>
                <AssignDeliveryToUser.RequestButton
                    model={assignToDeliveryModel}
                    user={user}
                    delivery={{
                        id: 1,
                        status: 'created',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }}
                />
            </Root>
        );
    }

    if (status === 'delivering') {
        return (
            <Root>
                <StatusList>
                    <StatusCreated createDate={createDate} />
                    <Spacer y={4} />
                    <StatusInDelivery />
                </StatusList>
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
                    <StatusCanceled updateDate={updateDate} />
                </StatusList>
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
                    <StatusDelivered updateDate={updateDate} />
                </StatusList>
            </Root>
        );
    }

    return null;
};
