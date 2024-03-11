import {Delivery, User} from "@/shared/api";

export const isDeliveryAssignedToCourier = (delivery: Delivery, user: User) => {
    return delivery?.courier?.id === user.id;
}