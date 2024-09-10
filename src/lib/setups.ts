import { type apiConfig } from "@/config/api.config";
import { ConfigSchema } from "@/lib/ZodSchema";

export const validateAPIConfig = ({ config }: { config: apiConfig }) => {
  return ConfigSchema.safeParse(config);
};
