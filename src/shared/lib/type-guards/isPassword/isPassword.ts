import { z } from "zod";

const passwordSchema = z.string()
  .min(8)
  .max(30)

export type Password = z.infer<typeof passwordSchema>;

export const isPassword = (value: string): value is Password => {
  return passwordSchema.safeParse(value).success;
};