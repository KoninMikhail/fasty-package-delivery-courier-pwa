import { modelFactory } from 'effector-factorio';
import { combine, createEvent, createStore, Effect, sample } from 'effector';
import { Selection } from '@nextui-org/react';
import { Delivery, DeliveryStates } from '@/shared/api';
import {
    SetDeliveryStatusParameters,
    SetDeliveryStatusResponse,
} from '@/entities/delivery';
import { statuses } from '../data';

interface FactoryOptions {
    allowedStatuses?: DeliveryStates[];
    patchDeliveryStatusFx: Effect<
        SetDeliveryStatusParameters,
        SetDeliveryStatusResponse,
        Error
    >;
}

export const factory = modelFactory((options: FactoryOptions) => {
    const setDeliveryId = createEvent<Delivery['id']>();
    const messageChanged = createEvent<Delivery['comment']>();
    const statusChanged = createEvent<Selection>();
    const submitPressed = createEvent({
        name: 'submit',
    });
    const reset = createEvent();

    const $deliveryId = createStore<Optional<Delivery['id']>>(null).on(
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
        filter: ({ id }) => !!id,
        fn: (data) => data as SetDeliveryStatusParameters,
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
        setDeliveryId,
        reset,
    };
});
