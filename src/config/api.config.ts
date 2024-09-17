import { apiConfigT } from "@/types";

/**
 * This file contains the configuration for the API endpoints and tokens we use.
 */
export const apiConfig: apiConfigT = {
  // The clientId and clientSecret are used to authenticate the user with Microsoft Graph API using OAuth. You would
  // not need to change anything here if you can authenticate with your personal Microsoft account with OneDrive International.
  clientId: process.env.CLIENT_ID || "",
  clientSecret: process.env.CLIENT_SECRET || "",
  // Todo: check spelling
  postgressURL:
    process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL || "",

  // The redirectUri is the URL that the user will be redirected to after they have authenticated with Microsoft Graph API.
  // Likewise, you would not need to change redirectUri if you are using your personal Microsoft account with OneDrive International.
  redirectURI: process.env.REDIRECT_URI || "http://localhost:3000",

  // These are the URLs of the OneDrive API endpoints. You would not need to change anything here if you are using OneDrive International
  // or E5 Subscription OneDrive for Business. You may need to change these if you are using OneDrive 世纪互联.
  authApi: "https://login.microsoftonline.com/common/oauth2/v2.0",
  graphApi: "https://graph.microsoft.com/v1.0",

  // The scope we require are listed here, in most cases you would not need to change this as well.
  scope: "user.read files.read.all offline_access",
  secretKey: process.env.SECRET_KEY || "QVG6rjN",

  // Cache-Control header, check Vercel documentation for more details. The default settings imply:
  // - max-age=0: no cache for your browser
  // - s-maxage=0: cache is fresh for 60 seconds on the edge, after which it becomes stale
  // - stale-while-revalidate: allow serving stale content while revalidating on the edge
  // https://vercel.com/docs/concepts/edge-network/caching
  cacheControlHeader: "max-age=0, s-maxage=60, stale-while-revalidate",

  // For API fetching and CORS
  origin: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
};
