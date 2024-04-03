import {User} from "@/shared/api";

/**
 * @name getUserInitials
 * @description Get user initials from user object
 * @param user
 */
export const getUserInitials = (user: Nullable<User>): string => {
    const name = user?.first_name;
    const surname = user?.last_name;
    if (!name && !surname) return "";
    return user.first_name[0] + user.last_name[0];
}