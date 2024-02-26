import { modelFactory } from 'effector-factorio';
import { createEvent, createStore, Effect, Store } from 'effector';
import { Delivery, User } from '@/shared/api';
import { debug } from 'patronum';

type FactoryOptions = {
    deliveriesStore: Store<Delivery[]>;
    userStore: Store<User>;
    assignToDeliveryEffect: Effect<
        { userId: User['id']; deliveryId: Delivery['id'] },
        void,
        Error
    >;
};

export const factory = modelFactory((options: FactoryOptions) => {
    const assignPressed = createEvent();

    debug(assignPressed);

    const $assignedDeliveriesIds = createStore<Set<Delivery['id']>>(new Set());
    const $loading = options.assignToDeliveryEffect.pending;

    const assignToDelivery = options.assignToDeliveryEffect;

    return {
        assignPressed,
        assignToDelivery,
    };
});
