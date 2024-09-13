"use server";
import { revalidateTag } from "next/cache";
import { getCachedUser } from "./oAuthHandler";
import { apiConfig } from "@/config/api.config";
import { cookies } from "next/headers";
import { encrypt } from "./security";

export async function getCachedToken() {
  const userInfo = await getCachedUser();
  if (userInfo) return userInfo.accessToken;
}

export async function refreshItems() {
  await revalidateTag("items");
}

export async function grantPermission(secretKey: string) {
  if (secretKey === apiConfig.secretKey) {
    const cookieStore = cookies();
    const userInfo = await getCachedUser();
    const encrypted = await encrypt({ payload: { id: userInfo?.userId } });
    cookieStore.set("session", encrypted);
    return { success: true };
  } else {
    return { success: false, error: "Invalid Secret Key" };
  }
}
