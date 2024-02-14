import {User} from "@/shared/api";

/**
 * @name getUserInitials
 * @description Get user initials from user object
 * @param user
 */
export const getUserInitials = (user: User): string => {
    return user.first_name[0] + user.last_name[0];
}