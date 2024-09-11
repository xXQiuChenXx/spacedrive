import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: varchar("id", { length: 20 }).primaryKey(),
  userId: uuid("user_id").unique().notNull(),
  mail: varchar("mail", { length: 254 }).notNull(),
  refreshToken: text("refresh_token"),
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
