import { User } from "@/db/schema";
import { ConfigSchema } from "@/lib/ZodSchema";
import { z } from "zod";

export type apiConfigT = z.infer<typeof ConfigSchema>;

export interface AuthTokenOnly {
  refreshToken: string;
  accessToken: string;
  [key: string]: unknown;
}

export interface DecrytedToken {
  refreshToken: string;
  [key: string]: unknown;
}

export type UserInfo = AuthTokenOnly & User
