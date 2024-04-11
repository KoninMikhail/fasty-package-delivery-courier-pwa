import {Delivery} from "@/shared/api";

export const getDeliveryClient = (delivery: Delivery): Delivery['client'] => {
    return delivery?.client;
}