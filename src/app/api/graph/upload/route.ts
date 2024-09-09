import { getUploadItemURL } from "@/lib/graphAPI";
import { getCachedToken } from "@/lib/oAuthHandler";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const path = formData.get("path") as string;
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

  if (!response?.error) {
    await revalidateTag("items");
    return Response.json(response);
  }
}
