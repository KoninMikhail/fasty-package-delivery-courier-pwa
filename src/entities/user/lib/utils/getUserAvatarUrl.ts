import { User } from "@/shared/api";

/**
 * @name getUserAvatarUrl
 * @description Get user avatar url from user object
 * @param user
 */
export const getUserAvatarUrl = (user: User) => {
  return user.avatar_src || undefined;
};
