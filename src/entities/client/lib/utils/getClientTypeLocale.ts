import {Client} from "@/shared/api";
import {sharedConfigLocale} from "@/shared/config";
import {translationNS} from "../../config";

const {locale} = sharedConfigLocale;


export const getClientTypeLocale = (client: Client) => {
    if (client.type === 'organization') {
        return locale.t('client.type.organization', {
            ns: translationNS
        });
    }
    if (client.type === 'personal') {
        return locale.t('client.type.person', {
            ns: translationNS
        });
    }
    return locale.t('client.type.unknown', {
        ns: translationNS
    });
}