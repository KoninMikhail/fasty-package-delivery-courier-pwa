import {Client} from "@/shared/api";

export const getClientName = (client: Client) => {
    return client?.name || '';
}