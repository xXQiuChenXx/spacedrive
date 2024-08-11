import { db } from "@/db";
import { credentials } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getToken() {
  const token = await db
    .select()
    .from(credentials)
    .where(eq(credentials.id, "main"));
  return token;
}

interface BasicToken {
  accessToken: string;
  refreshToken: string;
}

export async function saveToken({ accessToken, refreshToken }: BasicToken) {
  try {
    await db
      .insert(credentials)
      .values({
        id: "main",
        accessToken,
        refreshToken,
      })
      .onConflictDoUpdate({
        target: credentials.id,
        set: {
          accessToken,
          refreshToken,
        },
      });
  } catch (error) {
    console.log(error);
  }
}
