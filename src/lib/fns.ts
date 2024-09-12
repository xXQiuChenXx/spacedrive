"use server";
import {
  getFileContent,
  getItems,
  ItemsResponse,
  OriResponse,
} from "@/lib/driveRequest";
import { revalidateTag, unstable_cache } from "next/cache";
import { getToken } from "./oAuthHandler";
import { apiConfig } from "@/config/api.config";
import { cookies } from "next/headers";
import { getUserFromDB } from "./oAuthStore";
import { decrypt, encrypt } from "./security";

export async function getInformations({
  accessToken,
  params,
}: {
  accessToken: string;
  params: string[];
}) {
  let isAdmin = false;
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;

  if (session) {
    const decrypted = await decrypt(session);
    const data = await getUserFromDB();
    if (decrypted?.id && decrypted?.id === data?.userId) {
      isAdmin = true;
    }
  }

  const items = (await getItems({
    access_token: accessToken,
    folder: params,
    listChild: true,
  })) as ItemsResponse[];

  let item;
  let readmeFile = items?.find(
    (item) => item.name.toLowerCase() === "readme.md"
  );
  let readmeContent;

  if (!items) {
    item = (await getItems({
      access_token: accessToken,
      folder: params,
      row: true,
    })) as OriResponse;
  }

  if (readmeFile) {
    readmeContent = await getFileContent(readmeFile, accessToken);
  }

  return { items, item, readmeContent, readmeFile, isAdmin };
}

export const getCachedToken = unstable_cache(getToken, [], {
  revalidate: 60 * 30, // 30 minutes
  tags: ["token"],
});

export async function refreshItems() {
  await revalidateTag("items");
}

export async function grantPermission(secretKey: string) {
  if (secretKey === apiConfig.secretKey) {
    const cookieStore = cookies();
    const data = await getUserFromDB();
    const encrypted = await encrypt({ payload: {id: data?.userId} });
    cookieStore.set("session", encrypted);
    return { success: true };
  } else {
    return { success: false, error: "Invalid Secret Key" };
  }
}
