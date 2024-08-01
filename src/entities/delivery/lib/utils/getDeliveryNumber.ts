import { Delivery } from "@/shared/api";

export const getDeliveryNumber = (delivery: Delivery, padLeft?: number) => {
  if (!delivery) console.error('Delivery is not defined');
  const deliveryId = delivery?.deliveryId || 0;
  return deliveryId.toString().padStart(padLeft || 0, '0') ?? '';
}