"use server";
import { cookies } from "next/headers";
import { apiConfig } from "@/config/api.config";
import { decrypt, encrypt } from "@/lib/security";
import { getCachedUser } from "./oAuthHandler";

export async function isAdmin({
  session,
}: {
  session: string;
}): Promise<boolean> {
  const decrypted = await decrypt(session);
  if (decrypted) {
    const userInfo = await getCachedUser();
    return decrypted.id === userInfo?.userId;
  }
  return false;
}

export async function havePermission({
  session,
  path,
}: {
  session: string;
  path: string[];
}) {
  const decrypted = await decrypt(session);
  if (decrypted) {
    const userInfo = await getCachedUser();
    return decrypted.id === userInfo?.userId;
  }
  return false;
}

// Get admin access if secret key is correct
export async function grantAdmin(secretKey: string): Promise<boolean> {
  if (secretKey === apiConfig.secretKey) {
    const cookieStore = await cookies();
    const userInfo = await getCachedUser();
    const encrypted = await encrypt({ payload: { userId: userInfo?.userId, path: ["test"] } });
    cookieStore.set("session", encrypted);
    return true;
  }
  return false;
}

export async function grantPathAccess({
  newPath,
  current,
}: {
  newPath: string;
  current: string[];
}) {
  const cookieStore = await cookies();
  const encrypted = await encrypt({ payload: { path: [newPath, ...current] } });
  cookieStore.set("session", encrypted);
}

export async function clearPermission() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}