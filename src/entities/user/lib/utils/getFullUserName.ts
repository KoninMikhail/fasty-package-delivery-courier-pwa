import { User } from "@/shared/api";

/**
 * @name getFullUserName
 * @description Get full username from user object
 * @param user
 */
export const getFullUserName = (user: Nullable<User>): string => {
  const name = user?.firstName;
  const surname = user?.lastName;

  if (!name && !surname) return "";

  return `${name} ${surname}`;
};
