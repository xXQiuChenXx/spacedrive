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

type AuthResponse = {
  token_type: string;
  scope: string;
  expires_in: number;
  ext_expires_in: number;
  access_token: string;
  refresh_token: string;
};

export const exchangeCode = async (code: string): Promise<AuthResponse> => {
  let response = await fetch(
    `${config.authApi}/token`,
    {
      method: "post",
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: config.redirectURI,
        grant_type: "authorization_code",
        code: code,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  ).then((res) => (res.ok ? res.json() : null));

  if (!response || response?.error)
    throw new Error(
      response?.error ||
        "Invalid exchange code or an error occured, please try again latter."
    );
  return response;
};

export const exchangeToken = async (refreshToken: string) => {
  let response = await fetch(
    `${config.authApi}/token`,
    {
      method: "POST",
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: config.redirectURI,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  ).then((res) => (res.ok ? res.json() : null));

  if (response?.error)
    throw new Error(
      response?.error ||
        "An error occured while exchanging token, please try again latter."
    );
  return response;
};

export const exchangeInformation = async (accessToken: string) => {
  let response = await fetch("https://graph.microsoft.com/v1.0/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((res) => res.json());

  if (response?.error)
    throw new Error(
      response?.error ||
        "An error occured while exchanging token, please try again latter."
    );
  return response;
};
