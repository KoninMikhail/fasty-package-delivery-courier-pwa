import {Delivery} from "@/shared/api";

export const getDeliveryContact = (delivery: Delivery) => {
    return delivery.contact;
}