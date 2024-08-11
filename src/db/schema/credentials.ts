// import { relations } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
// import { lifecycleDates } from "./utils";
// import { generateId } from "@/libs/id";

export const credentials = pgTable("credentials", {
  id: varchar("id", { length: 20}).primaryKey(),
//   id: varchar("id", { length: 50 })
//     .$defaultFn(() => generateId("credentials"))
//     .primaryKey(),
  accessToken: text("access_token").unique().notNull(),
  refreshToken: text("refresh_token").unique().notNull(),
//   ...lifecycleDates,
});

export type Credentials = typeof credentials.$inferSelect;
export type NewCredentails = typeof credentials.$inferInsert;
