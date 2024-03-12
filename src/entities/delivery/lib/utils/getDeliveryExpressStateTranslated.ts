import { Delivery } from "@/shared/api";
import {sharedConfigLocale} from "@/shared/config";
import {translationNS} from "../../config";

const { locale } = sharedConfigLocale;


export const getDeliveryExpressStateTranslated = (delivery: Delivery) => {
  const isExpress = delivery.express

  if (isExpress) {
    return locale.t('delivery.type.express.label.true', {
      ns: translationNS
    });
  }

  return locale.t('delivery.type.express.label.false', {
    ns: translationNS
  });
}