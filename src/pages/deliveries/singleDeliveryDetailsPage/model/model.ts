import { createGate } from 'effector-react';
import { combine, createStore, sample } from 'effector';
import { SetDeliveryStatus } from '@/features/delivery/setDeliveryStatus';
import {
    assignUserToDeliveryFx,
    getDeliveryAddress,
    getDeliveryByIdFx,
    getDeliveryClient,
    getDeliveryContents,
    getDeliveryCourier,
    getDeliveryId,
    getDeliveryManager,
    getDeliveryMetro,
    getDeliveryPickupDateTime,
    getDeliveryStatus,
    getDeliveryWeight,
    setDeliveryStatus,
} from '@/entities/delivery';
import { Route } from '@/entities/route';
import { sessionModel } from '@/entities/viewer';
import { getCachedDeliveryByIdFx } from '@/entities/delivery/model';
import { Delivery } from '@/shared/api';
import { isDeliveryAssignedToCourier } from '@/entities/delivery/lib';
import { debug } from 'patronum';

/* eslint-disable unicorn/no-array-method-this-argument */

/**
 * Gateway for the delivery details page
 */
export const DeliveryDetailsPageGateway = createGate<{
    deliveryId?: string;
}>();

const initialDelivery: Delivery = {
    id: 0,
    car: false,
    client_id: 0,
    comment: '',
    contact_id: 0,
    contents: '',
    deleted: false,
    date: '2024-02-21',
    express: false,
    manager_id: 0,
    states: 'created',
    time_end: '00:00',
    time_start: '00:00',
    weight: '00',
    courier: null,
    courier_id: null,
    contact: {
        id: 0,
        client_id: 10,
        name: '',
        email: '',
        job: '',
        default: false,
        deleted: false,
        phone: '',
    },
    client: {
        id: 0,
        client_type: 'person',
        name: '',
        deleted: false,
        created_at: '2024-03-04T13:12:04.000000Z',
        updated_at: '2024-03-04T13:12:04.000000Z',
        contacts: [
            {
                id: 0,
                client_id: 0,
                name: '',
                email: '',
                job: '',
                default: false,
                deleted: false,
                phone: '',
            },
        ],
        addresses: [
            {
                id: 0,
                client_id: 0,
                delivery_type: 'self',
                region: null,
                city: null,
                metro: null,
                address: null,
                point_id: null,
                cdek_type: null,
                default: false,
                deleted: false,
            },
        ],
    },
    address: {
        id: 0,
        client_id: 0,
        delivery_type: 'courier',
        region: null,
        city: null,
        metro: '',
        address: '',
        point_id: null,
        cdek_type: null,
        default: false,
        deleted: false,
    },
    created_at: new Date(),
    updated_at: new Date(),
    manager: {
        id: 0,
        first_name: '',
        last_name: '',
        gender: 'male',
        email: '',
        email_verified_at: null,
        deleted: false,
        created_at: '2024-03-04T13:12:00.000000Z',
        updated_at: '2024-03-04T13:12:00.000000Z',
        user_role: {
            name: 'Дизайнер',
            capabilities: ['user', 'design', 'worker', 'services'],
            states: ['design/inbox', 'design/in-progress', 'design/done'],
        },
    },
};

/**
 * Main delivery store, stores a nullable Delivery object.
 * Updates when any of the effects successfully complete and provide new data.
 */
export const $delivery = createStore<Delivery>(initialDelivery)
    .on(assignUserToDeliveryFx.doneData, (_, delivery) => delivery)
    .on(getDeliveryByIdFx.doneData, (_, delivery) => delivery)
    .on(getCachedDeliveryByIdFx.doneData, (_, delivery) => delivery)
    .on(setDeliveryStatus.doneData, (_, delivery) => delivery)
    .reset(DeliveryDetailsPageGateway.close);

debug($delivery);

// Derived stores to decompose the delivery object for easier consumption
export const $$deliveryId = $delivery.map((delivery) =>
    getDeliveryId(delivery),
);

export const $$deliveryStatus = $delivery.map((delivery) =>
    getDeliveryStatus(delivery),
);
export const $$deliveryContents = $delivery.map((delivery) =>
    getDeliveryContents(delivery),
);
export const $$deliveryWeight = $delivery.map((delivery) =>
    getDeliveryWeight(delivery),
);
export const $$deliveryAddress = $delivery.map((delivery) =>
    getDeliveryAddress(delivery),
);
export const $$deliveryMetro = $delivery.map((delivery) =>
    getDeliveryMetro(delivery),
);
export const $$deliveryPickupDateTime = $delivery.map((delivery) =>
    getDeliveryPickupDateTime(delivery, true, true),
);
export const $$deliveryClient = $delivery.map((delivery) =>
    getDeliveryClient(delivery),
);
export const $$deliveryUpdateDate = $delivery.map(
    (delivery) => delivery && delivery?.updated_at,
);
export const $$deliveryManager = $delivery.map((delivery) =>
    getDeliveryManager(delivery),
);
export const $$deliveryCourier = $delivery.map((delivery) =>
    getDeliveryCourier(delivery),
);

export const $$isViewerDelivery = combine(
    $delivery,
    sessionModel.$sessionStore,
    (delivery, viewer) => {
        return (
            delivery && viewer && isDeliveryAssignedToCourier(delivery, viewer)
        );
    },
);

sample({
    clock: DeliveryDetailsPageGateway.open,
    filter: (data) => !!data.deliveryId && typeof data.deliveryId === 'string',
    fn: (data) => ({ deliveryId: Number(data.deliveryId) }),
    target: getDeliveryByIdFx,
});

/**
 * State
 */

export const $error = createStore<Nullable<Error>>(null)
    .on(getDeliveryByIdFx.failData, (_, error) => error)
    .reset(DeliveryDetailsPageGateway.close);
export const $$hasError = $error.map((error) => error !== null);
export const $$notFound = $error.map(
    (error) => error?.message === 'DELIVERY_NOT_FOUND',
);

// debug(getDeliveryByIdFx.fail, getDeliveryByIdFx.finally);

/**
 * Delivery details store
 */
export const changeDeliveryStatusModel = SetDeliveryStatus.factory.createModel({
    patchDeliveryStatusFx: setDeliveryStatus,
});

export const mapModel = Route.Map.factory.createModel({
    center: [55.763_359_839_794_52, 37.634_951_406_515_2],
    zoom: 16,
    markers: [
        {
            lat: 55.763_359_839_794_52,
            lng: 37.634_951_406_515_2,
        },
    ],
});

/* sample({
    clock: $delivery,
    fn: (delivery) => {
        /!*  if (
            delivery &&
            delivery.address.latitude &&
            delivery.address.longitude
        ) {
            return [delivery.address.latitude, delivery.address.longitude];
        } *!/
        return [55.763_360_034_355_17, 37.635_180_351_088_096];
    },
    target: mapModel.addMarker,
}); */

sample({
    clock: DeliveryDetailsPageGateway.close,
    target: changeDeliveryStatusModel.reset,
});
