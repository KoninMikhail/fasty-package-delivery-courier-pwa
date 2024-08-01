import { Delivery, SubwayStation } from "@/shared/api";
import { sharedConfigLocale } from '@/shared/config';


export const getDeliveryMetro = (delivery: Delivery): SubwayStation['name'] => {
  const fallback = '-------';
  return delivery?.address?.subway?.name || fallback;
}