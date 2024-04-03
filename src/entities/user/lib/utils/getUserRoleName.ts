import {User} from "@/shared/api";
import {sharedConfigLocale} from "@/shared/config";
import {USER_ROLE_NAME_UNKNOWN, translationNS} from "@/entities/user/config";

const {locale} = sharedConfigLocale;


export const getUserRoleName = (user: Nullable<User>): string => {
    const roleName = user?.user_role.name;
    return roleName || locale.t(USER_ROLE_NAME_UNKNOWN, {
        ns: translationNS,
    });
}