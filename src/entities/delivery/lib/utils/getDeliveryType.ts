import { Delivery, DeliveryType } from "@/shared/api";

export const getDeliveryType = (delivery: Delivery): DeliveryType => {
  return delivery?.car ? 'car' : 'foot' || 'unknown';
}