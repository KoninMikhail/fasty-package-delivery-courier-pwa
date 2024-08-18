import {User} from "@/shared/api";
import {sharedConfigLocale} from "@/shared/config";
import {
    USER_ROLE_NAME_UNKNOWN,
    translationNS,
    USER_ROLE_NAME_MANAGER,
    USER_ROLE_NAME_COURIER
} from "@/entities/user/config";

const {locale} = sharedConfigLocale;


export const getUserRoleName = (user: Optional<User>): string => {
    const roleName = user?.role;
    switch (roleName) {
        case "MANAGER":
            return locale.t(USER_ROLE_NAME_MANAGER, {
                ns: translationNS,
            });
        case "COURIER":
            return locale.t(USER_ROLE_NAME_COURIER, {
                ns: translationNS,
            });

        default :
            return locale.t(USER_ROLE_NAME_UNKNOWN, {
                ns: translationNS,
            });
    }
}