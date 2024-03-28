import { Delivery } from "@/shared/api";
import { sharedConfigLocale } from '@/shared/config';
import {translationNS} from '../../config';

const { locale } = sharedConfigLocale;

export const getDeliveryAddress = (delivery: Delivery) => {
  const addressText = delivery?.address?.address;
  const city = delivery?.address?.city || locale.t('delivery.data.fallback.city', {ns: translationNS});
  const fallback = locale.t('delivery.data.fallback.address', {ns: translationNS});
  return addressText ? `${delivery?.address?.address}, ${city}` : fallback;
}