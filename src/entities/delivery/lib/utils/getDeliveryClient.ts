import {Delivery} from "@/shared/api";

export const getDeliveryClient = (delivery: Delivery): Delivery['client'] | undefined => {
    return delivery?.client;
}