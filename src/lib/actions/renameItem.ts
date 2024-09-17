"use server";

import { type ItemsResponse } from "@/lib/driveRequest";
import { redirect } from "next/navigation";
import { apiConfig } from "@/config/api.config";
import { revalidateTag } from "next/cache";
import { getTokenWithVerfication } from "../fns";

interface renameItemProps {
  item: ItemsResponse;
  newName: string;
}

export async function renameItem({ item, newName }: renameItemProps) {
  const { token } = await getTokenWithVerfication();
  if (!token) return redirect("/setup");
  const response = await fetch(
    `${apiConfig.graphApi}/items/${item.id}`,
    {
      method: "PATCH",
      body: JSON.stringify({ name: newName }),
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  revalidateTag("items");

  return {
    data: response?.error ? null : response,
    error: response?.error?.message,
  };
}
