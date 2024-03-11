import {Delivery} from "@/shared/api";

export const getDeliveryCourier = (delivery: Delivery): Delivery['courier'] => {
    return delivery?.courier;
}