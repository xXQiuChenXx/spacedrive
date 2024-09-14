"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getItemRequestURL } from "../graphAPI";
import { getTokenWithVerfication } from "../fns";

export async function createFolder({
  path,
  folder,
}: {
  path: string;
  folder: string;
}) {
  const { token } = await getTokenWithVerfication();
  if (!token) redirect("./setup");

  const response = await fetch(`${getItemRequestURL(path, true)}`, {
    method: "POST",
    body: JSON.stringify({
      name: folder,
      folder: {},
      "@microsoft.graph.conflictBehavior": "rename",
    }),
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  await revalidateTag("items");

  return {
    data: response?.error ? null : response,
    error: response?.error?.message,
  };
}
