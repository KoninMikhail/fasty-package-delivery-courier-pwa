import { modelFactory } from 'effector-factorio';
import { combine, createEvent, createStore, Effect, sample } from 'effector';
import {
    ChangeDeliveryStateRequest,
    Delivery,
    DeliveryStates,
} from '@/shared/api';
import { sharedLibTypeGuards, sharedLibEffector } from '@/shared/lib';
import { statuses } from '../data';

const { collectEffectErrors } = sharedLibEffector;
const { isEmpty } = sharedLibTypeGuards;

interface FactoryOptions {
    allowedStatuses?: DeliveryStates[];
    defaultSelectedStatus?: DeliveryStates;
    patchDeliveryStatusFx: Effect<ChangeDeliveryStateRequest, Delivery>;
}

export const factory = modelFactory((options: FactoryOptions) => {
    const setDeliveryId = createEvent<Delivery['id']>();
    const messageChanged = createEvent<Delivery['comment']>();
    const statusChanged = createEvent<DeliveryStates>();
    const statusChangeCompleted = createEvent<Delivery>();
    const submitPressed = createEvent();
    const reset = createEvent();

    const $deliveryId = createStore<Delivery['id']>('').on(
        setDeliveryId,
        (_, id) => id,
    );
    const $status = createStore<DeliveryStates>(
        options.defaultSelectedStatus ?? options.allowedStatuses?.[0] ?? 'done',
    )
        .on(statusChanged, (_, payload) => payload)
        .reset(reset);

    const $isRejectStatus = combine($status, (status) => {
        return status === 'canceled';
    });
    const $message = createStore<Delivery['comment']>('')
        .on(messageChanged, (_, payload) => payload)
        .reset(reset);

    const $formValid = combine(
        $status,
        $message,
        $isRejectStatus,
        (status, message, isRejectStatus) => {
            if (isEmpty(status)) return false;
            return !(isRejectStatus && message.length < 3);
        },
    );
    const $pending = options?.patchDeliveryStatusFx.pending;

    const allowedStatuses = statuses.filter((status) => {
        const statusList = options.allowedStatuses || ['done', 'canceled'];
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

    /**
     * Errors
     */
    const { $errors } = collectEffectErrors({
        effects: options.patchDeliveryStatusFx,
        reset: options.patchDeliveryStatusFx.doneData,
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
        $errors,
    };
});
