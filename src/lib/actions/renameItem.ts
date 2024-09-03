"use server";

import { type ItemsResponse } from "@/lib/driveRequest";
import { getCachedToken } from "../oAuthHandler";
import { redirect } from "next/navigation";
import { config } from "@/config/api.config";
import { revalidateTag } from "next/cache";

interface renameItemProps {
  item: ItemsResponse;
  newName: string;
}

export async function renameItem({ item, newName }: renameItemProps) {
  const token = await getCachedToken();
  if (!token) return redirect("/setup");
  const { accessToken } = token;
  const response = await fetch(`${config.graphApi}/me/drive/items/${item.id}`, {
    method: "PATCH",
    body: JSON.stringify({ name: newName }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  revalidateTag("items");

  return {
    data: response?.error ? null : response,
    error: response?.error,
  };
}
