import { modelFactory } from 'effector-factorio';
import { combine, createEvent, createStore, Effect, sample } from 'effector';
import { Delivery, User } from '@/shared/api';
import { AssignUserToDeliveryParameters } from '@/entities/delivery/model/effects/assignUserToDelivery';

type FactoryOptions = {
    assignToDeliveryEffect: Effect<
        AssignUserToDeliveryParameters,
        Delivery,
        Error
    >;
};

export const factory = modelFactory((options: FactoryOptions) => {
    const assignPressed = createEvent<{ delivery: Delivery; user: User }>();
    const assignConfirmed = createEvent();
    const assignCompleted = createEvent<Delivery['id']>();
    const assignRejected = createEvent();

    const $user = createStore<Nullable<User>>(null);
    const $delivery = createStore<Nullable<Delivery>>(null);
    const $assignedItems = createStore<Delivery['id'][]>([]);

    $user
        .on(assignPressed, (_, { user }) => user)
        .on(assignRejected, () => null);
    $delivery
        .on(assignPressed, (_, { delivery }) => delivery)
        .on(assignRejected, () => null);
    $assignedItems.on(assignCompleted, (state, id) => [...state, id]);

    /**
     * State
     */
    const $processing = options.assignToDeliveryEffect.pending;
    const assignToDelivery = options.assignToDeliveryEffect;

    sample({
        clock: assignConfirmed,
        source: combine($user, $delivery, (user, delivery) => ({
            user,
            delivery,
        })),
        filter: ({ user, delivery }) => !!user && !!delivery,
        fn: ({ user, delivery }) => {
            return {
                userId: user!.id,
                deliveryId: delivery!.id,
            };
        },
        target: options.assignToDeliveryEffect,
    });

    sample({
        clock: options.assignToDeliveryEffect.done,
        fn: (data) => data.params.deliveryId,
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
        $delivery,
    };
});
