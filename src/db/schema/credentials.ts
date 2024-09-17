import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const credentials = pgTable("credentials", {
  id: varchar("id", { length: 20 }).primaryKey(),
  accessToken: text("access_token").unique().notNull(),
  refreshToken: text("refresh_token").unique().notNull(),
  expiredIn: integer("expired_in").notNull(),
  issuedAt: integer("issued_at").notNull(),
});

export type Credentials = typeof credentials.$inferSelect;
export type NewCredentails = typeof credentials.$inferInsert;