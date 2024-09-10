import { z } from "zod";

export const ConfigSchema = z.object({
  clientId: z.string().uuid({ message: "Invalid Client ID"}),
  clientSecret: z
    .string()
    .min(32, { message: "Invalid client secret" })
    .max(128, { message: "Invalid client secret" }),
  postgressURL: z.string().startsWith("postgres://", {
    message: "Invalid PostgreSQL connection string",
  }),
  authApi: z.string(),
  graphApi: z.string(),
  redirectURI: z.string().url({ message: "Invalid redirect URL" }),
  secretKey: z
    .string()
    .min(6, { message: "Invalid secret key, min length is 6" }),
  scope: z
    .string()
    .includes("offline_access", {
      message:
        "scope 'offline_access' must be included to prevent re-auth needed everytime the token expired",
    })
    .includes("user.read", {
      message:
        "scope 'user.read' must be included to get the user information for authentication",
    }),
});
