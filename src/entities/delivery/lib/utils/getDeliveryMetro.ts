import { Delivery } from "@/shared/api";
import { sharedConfigLocale } from '@/shared/config';


export const getDeliveryMetro = (delivery: Delivery) => {
  const fallback = '-------';
  return delivery.address.metro || fallback;
}