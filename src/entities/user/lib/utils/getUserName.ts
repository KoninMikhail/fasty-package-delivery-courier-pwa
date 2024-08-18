import { User } from "@/shared/api";

export const getUserName = (user: Optional<User>): string => user?.firstName || '';