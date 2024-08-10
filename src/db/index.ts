import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "@/config/api.config";

import * as schema from "./schema/index";

const client = postgres(config.postgressURL);
export const db = drizzle(client, { schema });
