import {sharedConfigLocale} from "@/shared/config";
import {translationNS} from "../../config";
import {getNumberPluralForm} from "@/widgets/deliveries/history/lib";

const {locale} = sharedConfigLocale;

export const getSuccessDeliveriesCountText = (count?: number): string => {
    if (count) {
        const numberPluralForm = getNumberPluralForm(count);
        return locale.t('history.accordion.item.label.count.success', {
            context: numberPluralForm,
            replace: {
                successCount: count
            },
            ns: translationNS
        })
    }
    return '';
}