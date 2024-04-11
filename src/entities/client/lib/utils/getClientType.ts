import {Client} from "@/shared/api";
import {sharedConfigLocale} from "@/shared/config";
import {translationNS} from "../../config";

const {locale} = sharedConfigLocale;


export const getClientType = (client: Client) => client.client_type;