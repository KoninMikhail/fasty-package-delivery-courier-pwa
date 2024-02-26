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
    const popoverClosePressed = createEvent();

    debug(assignPressed);

    const $user = options.userStore;
    const $deliveries = options.deliveriesStore;
    const $selectedDelivery = createStore<Delivery | null>(null);
    const $assignedDeliveriesIds = createStore<Set<Delivery['id']>>(new Set());

    const $popoverVisible = createStore(false);
    const $loading = options.assignToDeliveryEffect.pending;

    $popoverVisible.on(assignPressed, (_) => true);
    $popoverVisible.on(popoverClosePressed, (_) => false);

    const assignToDelivery = options.assignToDeliveryEffect;

    return {
        assignPressed,
        popoverClosePressed,
        $popoverVisible,
        assignToDelivery,
    };
});
