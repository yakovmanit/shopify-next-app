import {z} from "zod";
import {sighUpSchema} from "@/lib";

export type TSignUpSchema = z.infer<typeof sighUpSchema>;