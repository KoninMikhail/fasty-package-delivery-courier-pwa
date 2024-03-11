import {Delivery} from "@/shared/api";

export const getDeliveryComment = (delivery: Delivery) => {
    return delivery.comment || 'string';
}