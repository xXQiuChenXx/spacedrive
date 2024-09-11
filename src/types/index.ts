import { ConfigSchema } from "@/lib/ZodSchema";
import { z } from "zod";

export type apiConfigT = z.infer<typeof ConfigSchema>;
