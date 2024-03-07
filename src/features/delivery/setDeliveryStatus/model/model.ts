import { modelFactory } from 'effector-factorio';
import {
    combine,
    createEvent,
    createStore,
    Effect,
    sample,
    Store,
} from 'effector';
import { Selection } from '@nextui-org/react';
import { Delivery, DeliveryStates } from '@/shared/api';
import {
    SetDeliveryStatusParameters,
    SetDeliveryStatusResponse,
} from '@/entities/delivery';
import { statuses } from '../data';

interface FactoryOptions {
    deliveryStore: Store<Delivery['id']>;
    allowedStatuses?: DeliveryStates[];
    patchDeliveryStatusFx: Effect<
        SetDeliveryStatusParameters,
        SetDeliveryStatusResponse,
        Error
    >;
}

export const factory = modelFactory((options: FactoryOptions) => {
    const messageChanged = createEvent<Delivery['comment']>();
    const statusChanged = createEvent<Selection>();
    const submitPressed = createEvent();
    const idChanged = createEvent<Delivery['id']>();
    const reset = createEvent();

    const $deliveryId = createStore<Nullable<Delivery['id']>>(null).on(
        idChanged,
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
        target: options.patchDeliveryStatusFx,
    });

    return {
        $message,
        $status,
        $isRejectStatus,
        $formValid,
        $pending,
        allowedStatuses,
        messageChanged,
        statusChanged,
        submitPressed,
        idChanged,
        reset,
    };
});
