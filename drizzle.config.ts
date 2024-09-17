import { type Config } from "drizzle-kit"
import { apiConfig } from "@/config/api.config"

export default {
  schema: "./src/db/schema/index.ts",
  dialect: "postgresql",
  out: "./src/drizzle",
  dbCredentials: {
    url: apiConfig.postgressURL,
  },
} satisfies Config
