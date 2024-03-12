import {Client} from "@/shared/api";
import {sharedConfigLocale} from "@/shared/config";
import {translationNS} from "../../config";

const {locale} = sharedConfigLocale;


export const getClientType = (client: Client) => {
    if (client.client_type === 'organization') {
        return locale.t('client.type.organization', {
            ns: translationNS
        });
    }
    if (client.client_type === 'person') {
        return locale.t('client.type.person', {
            ns: translationNS
        });
    }
    return locale.t('client.type.unknown', {
        ns: translationNS
    });
}