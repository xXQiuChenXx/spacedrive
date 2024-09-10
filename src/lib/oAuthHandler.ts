"use server";
import { apiConfig } from "@/config/api.config";
import { getTokenFromDB, saveTokenToDB, type TokenModel } from "./oAuthStore";
import { unstable_cache } from "next/cache";

type AuthResponse = {
  token_type: string; // 'Bearer'
  scope: string; // 'Files.Read Files.Read.All Files.Read.Selected ',
  expires_in: number; // 3665,
  ext_expires_in: number; // 3665,
  access_token: string;
  refresh_token: string;
  error?: {
    // error response
    message: string;
    code: string;
  };
};

const isTokenExpired = (token: TokenModel): boolean => {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return currentTime >= token.issuedAt + token.expiredIn - 5; // -5 for possible delay
};

export const exchangeCode = async (code: string): Promise<AuthResponse> => {
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

  if (!response || response?.error) throw new Error(response.error);
  return response;
};

export const exchangeToken = async ({
  refreshToken,
}: Pick<TokenModel, "refreshToken">): Promise<AuthResponse> => {
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

  if (response?.error) throw new Error(response.error);
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

  if (response?.error) throw new Error(response.error);
  return response;
};

export const renewToken = async ({
  refreshToken,
}: Pick<TokenModel, "refreshToken">) => {
  const res = (await exchangeToken({ refreshToken })) as AuthResponse;
  if (res.error) throw new Error(res.error.message); // break the recursion if error occur
  await saveTokenToDB({
    accessToken: res.access_token,
    refreshToken: res.refresh_token,
    expiredIn: res.expires_in,
    issuedAt: Math.floor(Date.now() / 1000),
  });
};

export const getToken = async (): Promise<Pick<
  TokenModel,
  "accessToken" | "refreshToken"
> | null> => {
  const token = await getTokenFromDB();
  if (!token) return null;
  if (isTokenExpired(token)) {
    await renewToken({ refreshToken: token.refreshToken });
    return await getToken(); // Recursion function
  } else {
    return {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    };
  }
};

export const getCachedToken = unstable_cache(getToken, [], {
  revalidate: 60, // 60 seconds
  tags: ["token"],
});
