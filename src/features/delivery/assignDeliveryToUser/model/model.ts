import { modelFactory } from 'effector-factorio';
import { createEvent, createStore, Effect, sample } from 'effector';
import { Delivery } from '@/shared/api';

type FactoryOptions = {
    assignToDeliveryFx: Effect<Delivery['id'], Delivery>;
};

export const factory = modelFactory((options: FactoryOptions) => {
    const assignPressed = createEvent<Delivery['id']>();
    const assignConfirmed = createEvent();
    const assignCompleted = createEvent<Delivery['id']>();
    const assignRejected = createEvent();

    const $deliveryIdForAssign = createStore<Optional<Delivery['id']>>(null);
    const $assignedItems = createStore<Delivery['id'][]>([]);

    $deliveryIdForAssign
        .on(assignPressed, (_, payload) => payload)
        .on(assignRejected, () => null);
    $assignedItems.on(assignCompleted, (state, id) => [...state, id]);

    /**
     * State
     */
    const $processing = options.assignToDeliveryFx.pending;
    const assignToDelivery = options.assignToDeliveryFx;

    sample({
        clock: assignConfirmed,
        source: $deliveryIdForAssign,
        filter: (deliveryId) => !!deliveryId,
        fn: (deliveryId) => deliveryId as string,
        target: options.assignToDeliveryFx,
    });

    sample({
        clock: options.assignToDeliveryFx.done,
        fn: (data) => data.params,
        target: assignCompleted,
    });

    return {
        assignPressed,
        assignRejected,
        assignConfirmed,
        assignToDelivery,
        assignCompleted,
        $assignedItems,
        $processing,
        $delivery: $deliveryIdForAssign,
    };
});
