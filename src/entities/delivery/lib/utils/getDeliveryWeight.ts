import { Delivery } from "@/shared/api";
import { sharedConfigLocale } from "@/shared/config";

const { locale } = sharedConfigLocale;

const DEFAULT_FIXED = 2;

export const getDeliveryWeight = (delivery: Delivery, fixed?: number) => {
  return Number(delivery.weight || 0).toFixed(fixed || DEFAULT_FIXED);
}