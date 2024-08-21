import { Delivery } from "@/shared/api";

export const getDeliverySystemId = (delivery: Delivery, padLeft?: number) => {
  if (!delivery) console.error('Delivery is not defined');
  return  delivery?.id || '0';
}