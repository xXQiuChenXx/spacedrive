import { db } from "@/db";
import { credentials } from "@/db/schema";
import { eq } from "drizzle-orm";

export type TokenModel = {
  accessToken: string;
  refreshToken: string;
  expiredIn: number;
  issuedAt: number;
};

export async function getTokenFromDB(): Promise<TokenModel | null> {
  return (
    await db.select().from(credentials).where(eq(credentials.id, "main"))
  )[0];
}

export async function saveTokenToDB({
  accessToken,
  refreshToken,
  expiredIn,
  issuedAt,
}: TokenModel) {
  try {
    await db
      .insert(credentials)
      .values({
        id: "main",
        accessToken,
        refreshToken,
        expiredIn,
        issuedAt,
      })
      .onConflictDoUpdate({
        target: credentials.id,
        set: {
          accessToken,
          refreshToken,
          expiredIn,
          issuedAt,
        },
      });
  } catch (error) {
    console.log(error);
  }
}
