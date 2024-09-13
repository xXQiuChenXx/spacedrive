"use server";
import { revalidateTag } from "next/cache";
import { type ItemsResponse } from "../driveRequest";
import { apiConfig } from "@/config/api.config";
import { getCachedUser } from "@/lib/oAuthHandler";

export async function deleteItems({ items }: { items: ItemsResponse[] }) {
  const failed = [];
  const token = await getCachedUser();
  if (!token) return { data: null, error: "Token not found" };
  const { accessToken } = token;
  for (const item of items) {
    try {
      const response = await fetch(
        `${apiConfig.graphApi}/me/drive/items/${item.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) failed.push(item.name);
    } catch (error) {
      console.log(error);
      failed.push(item.name);
    }
  }
  await revalidateTag("items");
  
  return {
    data: null,
    error: failed.length
      ? `An error occur when trying to delete ${failed.join(", ")}`
      : null,
  };
}
