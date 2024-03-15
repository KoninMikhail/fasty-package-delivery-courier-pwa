import {sharedConfigLocale} from "@/shared/config";
import {enUS, ru} from "date-fns/locale";
import {format} from "date-fns";

const {locale} = sharedConfigLocale;

export const getLocaledDate = (date: string) => {
    const allLocales = {en: enUS, ru};
    // @ts-expect-error - TS not understand that allLocales[locale.language] is not undefined
    const currentLocale = allLocales[locale.language || 'en'];
    return format(date, 'PPP', {
        locale: currentLocale,
    });
}