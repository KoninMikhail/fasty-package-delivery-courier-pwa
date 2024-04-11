import {User} from "@/shared/api";
import {EMPTY_USER_AVATAR_PLACEHOLDER_URL} from "../../config";

export const getUserAvatarSource = (user: Nullable<User>) => {
    const isUserHasName = user?.first_name && user?.last_name;

    if (isUserHasName) {
        return user?.avatar_src || undefined;
    }

    return user?.avatar_src || EMPTY_USER_AVATAR_PLACEHOLDER_URL;
}