import {Delivery} from "@/shared/api";

export const getDeliveryManager = (delivery: Delivery) => {
    return delivery && delivery?.manager;
}