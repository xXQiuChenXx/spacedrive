"use server";

import { revalidateTag } from "next/cache";

export async function createFolder({
  path,
  folder,
}: {
  path: string;
  folder: string;
}) {
  const res = await fetch("http://localhost:3000/api/graph/create/folder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ path, newFolder: folder }),
  }).then((res) => res.json());

  revalidateTag("items");
  return {
    data: res?.error ? null : res,
    error: res?.error,
  };
}
