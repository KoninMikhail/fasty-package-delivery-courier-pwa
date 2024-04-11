import { Delivery } from "@/shared/api";
import { sharedConfigLocale } from "@/shared/config";
import { translationNS} from "../../config";

const { locale } = sharedConfigLocale;

const DEFAULT_FIXED = 2;

export const getDeliveryWeightPersisted = (delivery: Delivery, fixed?: number) => {
  return locale.t('delivery.card.weight.kg',{
    ns: translationNS,
    replace: {
      weight: Number(delivery?.weight || 0).toFixed(fixed || DEFAULT_FIXED)
    }
  });
}