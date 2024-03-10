import { Delivery } from "@/shared/api";

export const getDeliveryExpressState = (delivery: Delivery) => {
  return delivery.express;
}