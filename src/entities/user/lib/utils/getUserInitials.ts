import {User} from "@/shared/api";

/**
 * @name getUserInitials
 * @description Get user initials from user object
 * @param user
 */
export const getUserInitials = (user: Nullable<User>): string => {
    const name = user?.firstName;
    const surname = user?.lastName;
    if (!name && !surname) return "";
    return user.firstName[0] + user.lastName[0];
}