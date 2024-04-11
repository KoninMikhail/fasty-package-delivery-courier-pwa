import { Delivery } from "@/shared/api";
import { sharedConfigLocale } from '@/shared/config';
import {translationNS} from '../../config';

const { locale } = sharedConfigLocale;
export const getDeliveryContents = (delivery: Delivery) => {
  const fallback = locale.t('delivery.data.fallback.contents', {
    ns: translationNS
  });
  return delivery?.contents || fallback;
}