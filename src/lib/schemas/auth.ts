import {z} from "zod";

export const sighUpSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string(),
  lastName: z.string(),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});