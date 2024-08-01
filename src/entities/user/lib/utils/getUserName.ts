import { User } from "@/shared/api";

export const getUserName = (user: Nullable<User>): string => user?.firstName || '';