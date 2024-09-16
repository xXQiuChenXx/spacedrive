import "server-only";
import { apiConfig } from "@/config/api.config";
import { deleteTokenFromDB, getUserFromDB } from "./oAuthStore";
import { unstable_cache } from "next/cache";
import { decrypt } from "@/lib/security";
import { DecrytedToken, UserInfo } from "@/types";

export type AuthResponse = {
  token_type: string; // 'Bearer'
  scope: string; // 'Files.Read Files.Read.All Files.Read.Selected ',
  expires_in: number; // 3665,
  ext_expires_in: number; // 3665,
  access_token: string;
  refresh_token: string;
  error?:
    | {
        // error response
        message: string;
        code: string;
      }
    | string;
};

export type ErrorResponse = {
  error: string;
  error_description: string;
  error_codes: number[];
  timestamp: string;
  trace_id: string;
  correlation_id: string;
  error_uri: string;
};

export const exchangeCode = async (
  code: string
): Promise<AuthResponse | null> => {
  let response = await fetch(`${apiConfig.authApi}/token`, {
    method: "post",
    body: new URLSearchParams({
      client_id: apiConfig.clientId,
      client_secret: apiConfig.clientSecret,
      redirect_uri: apiConfig.redirectURI,
      grant_type: "authorization_code",
      code: code,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    cache: "no-cache",
  }).then((res) => res.json());
  return response;
};

export const exchangeToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<AuthResponse> => {
  let response = await fetch(`${apiConfig.authApi}/token`, {
    method: "POST",
    body: new URLSearchParams({
      client_id: apiConfig.clientId,
      client_secret: apiConfig.clientSecret,
      redirect_uri: apiConfig.redirectURI,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-cache",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((res) => res.json());

  return response;
};

// exchange information
export const getAccountInformation = async (accessToken: string) => {
  let response = await fetch("https://graph.microsoft.com/v1.0/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    cache: "no-cache",
  }).then((res) => res.json());

  if (response?.error) return null;
  return response;
};

export const getUser = async (): Promise<UserInfo | undefined> => {
  const token = await getUserFromDB();
  if (!token?.refreshToken) return;
  const payload = (await decrypt(token.refreshToken)) as DecrytedToken;
  if (payload && payload.refreshToken) {
    const data = await exchangeToken({ refreshToken: payload.refreshToken });
    if (data?.error === "invalid_grant") {
      await deleteTokenFromDB();
      return;
    }
    return {
      ...token,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  }
};

export const getCachedUser = unstable_cache(getUser, [], {
  revalidate: 60 * 20, // 20 minutes
  tags: ["token"],
});
