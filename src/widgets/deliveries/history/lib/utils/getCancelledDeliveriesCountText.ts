import {sharedConfigLocale} from "@/shared/config";
import {translationNS} from "../../config";
import {getNumberPluralForm} from "@/widgets/deliveries/history/lib";

const {locale} = sharedConfigLocale;

export const getCanceledDeliveriesCountText = (count?: number): string => {
    if (count) {
        const numberPluralForm = getNumberPluralForm(count);
        return locale.t('history.accordion.item.label.count.cancel', {
            context: numberPluralForm,
            replace: {
                canceledCount: count
            },
            ns: translationNS
        })
    }
    return '';
}