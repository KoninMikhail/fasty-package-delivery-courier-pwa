import {User} from "@/shared/api";

/**
 * @name getFullUserName
 * @description Get full user name from user object
 * @param user
 */
export const getFullUserName = (user: User): string => {
    return `${user.first_name} ${user.last_name}`;
}