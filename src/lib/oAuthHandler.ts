import { config } from "@/config/api.config";

export function generateAuthorisationUrl(): string {
  const { clientId, redirectURI, authApi, scope } = config;
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("redirect_uri", redirectURI);
  params.append("response_type", "code");
  params.append("scope", scope);
  params.append("response_mode", "query");

  return `${authApi}/authorize?${params.toString()}`;
}
