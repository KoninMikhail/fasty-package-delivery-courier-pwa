import { modelFactory } from 'effector-factorio';
import { createEvent, createStore, Effect, sample } from 'effector';
import { Delivery } from '@/shared/api';
import { pending } from 'patronum';
import { sharedLibEffector } from '@/shared/lib';

const { collectEffectErrors } = sharedLibEffector;

type FactoryOptions = {
    assignToDeliveryFx: Effect<Delivery['id'], Delivery>;
};

export const factory = modelFactory((options: FactoryOptions) => {
    const assignPressed = createEvent<Delivery['id']>();
    const assignConfirmed = createEvent();
    const assignCompleted = createEvent<Delivery>();
    const assignRejected = createEvent();
    const reset = createEvent();

    const $deliveryIdForAssign = createStore<Optional<Delivery['id']>>(null)
        .on(assignPressed, (_, payload) => payload)
        .reset([assignRejected, reset]);
    const $assignedItemsToUsers = createStore<Delivery['id'][]>([])
        .on(assignCompleted, (state, delivery) => [...state, delivery.id])
        .reset(reset);

    /**
     * State
     */
    const $processing = pending({ effects: [options.assignToDeliveryFx] });
    const assignToDelivery = options.assignToDeliveryFx;

    sample({
        clock: assignConfirmed,
        source: $deliveryIdForAssign,
        filter: (deliveryId) => !!deliveryId,
        fn: (deliveryId) => deliveryId as string,
        target: options.assignToDeliveryFx,
    });

    sample({
        clock: options.assignToDeliveryFx.doneData,
        target: assignCompleted,
    });

    sample({
        clock: options.assignToDeliveryFx.failData,
        target: assignRejected,
    });

    /**
     * Errors
     */
    const { $errors } = collectEffectErrors({
        effects: options.assignToDeliveryFx,
        reset: options.assignToDeliveryFx.doneData,
    });

    return {
        assignPressed,
        assignRejected,
        assignConfirmed,
        assignToDelivery,
        assignCompleted,
        $assignedItems: $assignedItemsToUsers,
        $processing,
        $delivery: $deliveryIdForAssign,
        $errors,
    };
});
