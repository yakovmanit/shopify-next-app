import {z} from "zod";
import {loginSchema, sighUpSchema} from "@/lib";

export type TSignUpSchema = z.infer<typeof sighUpSchema>;

export type TLoginSchema = z.infer<typeof loginSchema>;