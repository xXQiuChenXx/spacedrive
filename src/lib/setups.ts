import { type apiConfig } from "@/config/api.config";
import { ConfigSchema } from "@/lib/ZodSchema";

export const validateAPIConfig = ({ config }: { config: apiConfig }) => {
  return ConfigSchema.safeParse(config);
};

export const currentStep = ({ config }: { config: apiConfig }) => {
  const validateConfig = validateAPIConfig({ config });
  if (!validateConfig?.success) return "step-1";
  return "step-2"
};
