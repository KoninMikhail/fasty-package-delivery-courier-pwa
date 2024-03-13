import {Delivery} from "@/shared/api";

export const isDeliveryHasCoordinates = (delivery: Delivery): boolean => {
    const lat = delivery.address.latitude;
    const lng = delivery.address.longitude;
    return !!lat && !!lng;
}

