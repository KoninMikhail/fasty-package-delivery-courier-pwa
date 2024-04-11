import { Delivery, DeliveryType } from "@/shared/api";

export const getDeliveryType = (delivery: Delivery): string => {
  return delivery?.car ? 'car' : 'foot' || 'unknown';
}