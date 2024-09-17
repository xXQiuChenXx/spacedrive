import { db } from "@/db";
import { NewUser, user, User } from "@/db/schema";
import { eq } from "drizzle-orm";

// Define the Optional type
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export async function getUserFromDB(): Promise<User | null> {
  return (await db.select().from(user).where(eq(user.id, "default")))[0];
}

export async function updateToken({
  refresh_token,
}: {
  refresh_token: string;
}) {
  return await db
    .update(user)
    .set({
      refreshToken: refresh_token,
    })
    .where(eq(user.id, "default"))
    .returning({ refreshToken: user.refreshToken });
}

export async function saveUserToDB({
  id = "default",
  mail,
  refreshToken,
  userId,
}: Optional<NewUser, "id">): Promise<void> {
  await db
    .insert(user)
    .values({
      id,
      mail,
      refreshToken,
      userId,
    })
    .onConflictDoUpdate({
      target: user.id,
      set: {
        mail,
        refreshToken,
        userId,
      },
    });
}

export async function deleteTokenFromDB() {
  await db
    .update(user)
    .set({
      refreshToken: null,
    })
    .where(eq(user.id, "default"));
}
