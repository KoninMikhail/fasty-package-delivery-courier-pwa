import { modelFactory } from 'effector-factorio';
import { combine, createEvent, createStore, Effect, sample } from 'effector';
import { Selection } from '@nextui-org/react';
import {
    ChangeDeliveryStateRequest,
    Delivery,
    DeliveryStates,
} from '@/shared/api';
import { sharedLibTypeGuards } from '@/shared/lib';
import { statuses } from '../data';

const { isEmpty } = sharedLibTypeGuards;

interface FactoryOptions {
    allowedStatuses?: DeliveryStates[];
    patchDeliveryStatusFx: Effect<ChangeDeliveryStateRequest, Delivery>;
}

export const factory = modelFactory((options: FactoryOptions) => {
    const setDeliveryId = createEvent<Delivery['id']>();
    const messageChanged = createEvent<Delivery['comment']>();
    const statusChanged = createEvent<Selection>();
    const statusChangeCompleted = createEvent<Delivery>();
    const submitPressed = createEvent();
    const reset = createEvent();

    const $deliveryId = createStore<Delivery['id']>('').on(
        setDeliveryId,
        (_, id) => id,
    );
    const $status = createStore<Selection>(new Set())
        .on(statusChanged, (_, payload) => payload)
        .reset(reset);
    const $isRejectStatus = combine($status, (status) => {
        return status instanceof Set && status.has('cancelled');
    });
    const $message = createStore<Delivery['comment']>('')
        .on(messageChanged, (_, payload) => payload)
        .reset(reset);

    const $formValid = combine($status, $message, (status, message) => {
        if (status instanceof Set && status.size === 0) return false;
        return !(
            status instanceof Set &&
            status.has('canceled') &&
            message.length < 3
        );
    });
    const $pending = options?.patchDeliveryStatusFx.pending;

    const allowedStatuses = statuses.filter((status) => {
        const statusList = options.allowedStatuses || ['canceled', 'done'];
        return statusList.includes(status.id);
    });

    sample({
        clock: submitPressed,
        source: combine(
            $status,
            $message,
            $deliveryId,
            (status, message, id) => {
                return {
                    id,
                    state: [...status].join(''),
                    comment: message,
                };
            },
        ),
        filter: ({ id }) => !isEmpty(id),
        fn: (data) => data as ChangeDeliveryStateRequest,
        target: options.patchDeliveryStatusFx,
    });

    sample({
        clock: options.patchDeliveryStatusFx.doneData,
        target: statusChangeCompleted,
    });

    return {
        $message,
        $status,
        $isRejectStatus,
        $formValid,
        $pending,
        statusChangeCompleted,
        allowedStatuses,
        messageChanged,
        statusChanged,
        submitPressed,
        setDeliveryId,
        reset,
    };
});
