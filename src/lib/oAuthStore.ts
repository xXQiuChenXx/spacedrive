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
