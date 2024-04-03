import { User } from "@/shared/api";

/**
 * @name getFullUserName
 * @description Get full username from user object
 * @param user
 */
export const getFullUserName = (user: Nullable<User>): string => {
  const name = user?.first_name;
  const surname = user?.last_name;

  if (!name && !surname) return "";

  return `${user.first_name} ${user.last_name}`;
};
