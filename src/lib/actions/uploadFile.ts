"use server";

import { getCachedToken } from "@/lib/oAuthHandler";
import { redirect } from "next/navigation";
import { getUploadItemURL } from "@/lib/graphAPI";
import { revalidateTag } from "next/cache";

export async function uploadFile({ formdata }: { formdata: FormData }) {
  const file = formdata.get("file") as File;
  const path = formdata.get("path") as string;
  if (!file || !path) return { error: "400 Bad Request" };

  const token = await getCachedToken();
  if (!token) return redirect("/setup");
  const { accessToken } = token;

  const response = await fetch(
    getUploadItemURL({
      fileName: encodeURIComponent(file.name),
      path: path,
    }),
    {
      method: "PUT",
      body: file,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": file.type,
      },
    }
  ).then((res) => res.json());
  console.log(response)
  if (!response?.error) await revalidateTag("items");
  return {
    data: response?.error ? null : response,
    error: response?.error?.message,
  };
}
