import {Delivery} from "@/shared/api";

export const getDeliveryStatus = (delivery: Delivery): Delivery['state'] =>{
    return delivery.state;
}