import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { apiConfig } from "@/config/api.config";

import * as schema from "./schema/index";

const client = postgres(apiConfig.postgressURL);
export const db = drizzle(client, { schema });
