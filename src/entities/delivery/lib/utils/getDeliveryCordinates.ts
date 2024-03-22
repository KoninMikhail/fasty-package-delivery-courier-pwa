import {Delivery} from "@/shared/api";
import {Address} from "@/shared/api/types/AdressTypes";

export const getDeliveryCoordinates = (delivery: Delivery):Pick<Address, 'latitude' | 'longitude'> | null => {
    const {address} = delivery;
    const {latitude, longitude} = address;

    if (!latitude || !longitude) {
        return null;
    }

    return ({
        latitude,
        longitude
    });
}