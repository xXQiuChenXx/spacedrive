"use server";

import { revalidateTag } from "next/cache";
import { getCachedUser } from "../oAuthHandler";
import { redirect } from "next/navigation";
import { getItemRequestURL } from "../graphAPI";

export async function createFolder({
  path,
  folder,
}: {
  path: string;
  folder: string;
}) {
  const token = await getCachedUser();
  if (!token) return redirect("/setup");
  const { accessToken } = token;
  const response = await fetch(`${getItemRequestURL(path, true)}`, {
    method: "POST",
    body: JSON.stringify({
      name: folder,
      folder: {},
      "@microsoft.graph.conflictBehavior": "rename",
    }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  await revalidateTag("items");

  return {
    data: response?.error ? null : response,
    error: response?.error?.message,
  };
}
