import { type Config } from "drizzle-kit"
import { config } from "@/config/api.config"

export default {
  schema: "./src/db/schema/index.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: config.postgressURL,
  },
} satisfies Config
