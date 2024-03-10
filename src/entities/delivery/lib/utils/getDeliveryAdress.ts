import { Delivery } from "@/shared/api";
import { sharedConfigLocale } from '@/shared/config';
import {translationNS} from '../../config';

const { locale } = sharedConfigLocale;

export const getDeliveryAddress = (delivery: Delivery) => {
  const fallback = locale.t('delivery.data.fallback.address', {ns: translationNS});
  return delivery.address.address || fallback;
}