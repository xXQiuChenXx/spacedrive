"use server";
import { revalidateTag } from "next/cache";
import { type ItemsResponse } from "../driveRequest";
import { apiConfig } from "@/config/api.config";
import { getTokenWithVerfication } from "../fns";

export async function deleteItems({ items }: { items: ItemsResponse[] }) {
  const { token } = await getTokenWithVerfication();
  if (!token) return { data: null, error: "Token not found" };

  const failed = [];
  for (const item of items) {
    try {
      const response = await fetch(
        `${apiConfig.graphApi}/me/drive/items/${item.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
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
