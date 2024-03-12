import {Delivery, DeliveryType} from "@/shared/api";
import {sharedConfigLocale} from "@/shared/config";
import {translationNS} from "../../config";

const {locale} = sharedConfigLocale;

export const getDeliveryTypeTranslated = (delivery: Delivery): string => {
    const translationKey = delivery?.car ? 'delivery.type.onCar' : 'delivery.type.onFoot' || 'delivery.type.unknown';
    return locale.t(translationKey, {
        ns: translationNS
    });
}