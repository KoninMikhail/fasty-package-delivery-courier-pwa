import {Delivery} from "@/shared/api";

export const getDeliveryStatus = (delivery: Delivery): Delivery['states'] =>{
    return delivery.states;
}