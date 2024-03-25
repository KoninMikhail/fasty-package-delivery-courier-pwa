import { modelFactory } from 'effector-factorio';
import { combine, createEvent, createStore, Effect, sample } from 'effector';
import { Delivery, User } from '@/shared/api';
import { AssignUserToDeliveryParameters } from '@/entities/user';

type FactoryOptions = {
    assignToDeliveryFx: Effect<AssignUserToDeliveryParameters, Delivery, Error>;
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
    const $processing = options.assignToDeliveryFx.pending;
    const assignToDelivery = options.assignToDeliveryFx;

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
        target: options.assignToDeliveryFx,
    });

    sample({
        clock: options.assignToDeliveryFx.doneData,
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
