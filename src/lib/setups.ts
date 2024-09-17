import { ConfigSchema } from "@/lib/ZodSchema";
import { apiConfigT } from "@/types";

export const validateAPIConfig = ({ config }: { config: apiConfigT }) => {
  return ConfigSchema.safeParse(config);
};

export const currentStep = ({ config }: { config: apiConfigT }) => {
  const validateConfig = validateAPIConfig({ config });
  if (!validateConfig?.success) return "step-1";
  return "step-2";
};

export const generateAuthorisationUrl = ({
  config,
}: {
  config: apiConfigT;
}): string => {
  const { clientId, redirectURI, authApi, scope } = config;
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("redirect_uri", redirectURI);
  params.append("response_type", "code");
  params.append("scope", scope);
  params.append("response_mode", "query");

  return `${authApi}/authorize?${params.toString()}`;
};
