import { revalidatePath } from "next/cache";
import { type ItemsResponse } from "../driveRequest";

export async function deleteItems({ items }: { items: ItemsResponse[] }) {
  const failed = [];

  for (const item of items) {
    try {
      const res = await fetch("http://localhost:3000/api/graph/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }).then((res) => res.json());
      if (res?.error) failed.push(item.name);
    } catch (error) {
      console.log(error);
      failed.push(item.name);
    }
  }
  revalidatePath("/");
  return {
    data: null,
    error:
      failed.length ??
      `An error occur when trying to delete ${failed.join(", ")}`,
  };
}
