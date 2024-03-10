import { Delivery } from "@/shared/api";

export const getDeliveryId = (delivery: Delivery) => {
  if (!delivery) console.error('Delivery is not defined');
  return delivery.id || 0;
}