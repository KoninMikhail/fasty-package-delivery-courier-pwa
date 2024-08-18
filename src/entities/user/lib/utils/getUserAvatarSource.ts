import {User} from "@/shared/api";
import {EMPTY_USER_AVATAR_PLACEHOLDER_URL} from "../../config";

export const getUserAvatarSource = (user: Optional<User>) => {
    const isUserHasName = user?.firstName && user?.lastName;

    if (isUserHasName) {
        return user?.avatar_src || undefined;
    }

    return user?.avatar_src || EMPTY_USER_AVATAR_PLACEHOLDER_URL;
}