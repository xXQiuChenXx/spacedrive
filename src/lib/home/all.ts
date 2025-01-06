import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "../security";
import {
  getFileContent,
  getItems,
  ItemsResponse,
  OriResponse,
} from "../driveRequest";
import { getCachedUser } from "@/lib/oAuthHandler";
import { redirect } from "next/navigation";

export async function getInformations({
  params,
  isAdmin = false,
}: {
  params: string[];
  isAdmin?: boolean;
}) {
  const cookieStore = await cookies();
  const userInfo = await getCachedUser();
  const session = cookieStore.get("session")?.value;

  if (session) {
    const decrypted = await decrypt(session);
    isAdmin = decrypted?.id === userInfo?.userId;
  }

  if (!userInfo?.accessToken || !userInfo.refreshToken)
    return redirect("setup");

  const items = (await getItems({
    access_token: userInfo.accessToken,
    folder: params,
    listChild: true,
  })) as ItemsResponse[];

  const readmeFile = items?.find(
    (item) => item.name.toLowerCase() === "readme.md"
  );

  const readmeContent = readmeFile
    ? await getFileContent(readmeFile, userInfo.accessToken)
    : undefined;

  const item = items
    ? undefined
    : ((await getItems({
        access_token: userInfo.accessToken,
        folder: params,
        row: true,
      })) as OriResponse);

  return { items, item, readmeContent, readmeFile, isAdmin };
}
