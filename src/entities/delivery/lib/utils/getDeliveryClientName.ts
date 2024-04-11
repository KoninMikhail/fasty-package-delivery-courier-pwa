import {Delivery} from "@/shared/api";
import {getDeliveryClient} from "./getDeliveryClient";

export const getDeliveryClientName = (delivery: Delivery): string => {
    const client = getDeliveryClient(delivery)
    return client.name || 'string';
}