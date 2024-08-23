import { Delivery } from '@/shared/api';
import { createEvent, createStore } from 'effector';
import { getDeliveryCoordinates } from '@/entities/delivery';

export const setDeliveryDetails = createEvent<Delivery>();
export const updateDeliveryDetails = createEvent<Partial<Delivery>>();
export const resetDeliveryDetails = createEvent();

/**
 * Current page delivery details
 */
export const $pageDeliveryDetails = createStore<Optional<Delivery>>(null)
    .on(setDeliveryDetails, (_, delivery) => delivery)
    .on(updateDeliveryDetails, (delivery, update) => {
        if (!delivery) return null;
        return {
            ...delivery,
            ...update,
        };
    })
    .reset(resetDeliveryDetails);

export const $$deliveryCoordinates = $pageDeliveryDetails.map((delivery) => {
    if (!delivery) return null;
    const coordinates = getDeliveryCoordinates(delivery);
    return coordinates?.latitude && coordinates?.longitude
        ? {
              lat: Number(coordinates.latitude),
              lng: Number(coordinates.longitude),
          }
        : null;
});
