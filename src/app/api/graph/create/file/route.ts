import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { getUploadItemURL } from "@/lib/graphAPI";
import { getCachedToken } from "@/lib/oAuthHandler";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const path = formData.get("path") as string;

  if (!file || !path)
    return Response.json(
      { error: { message: "400 Bad Request" } },
      { status: 400 }
    );
  const token = await getCachedToken();
  if (!token) return redirect("/setup");
  const { accessToken } = token;
  console.log(getUploadItemURL({ fileName: file.name, path: path }));
  const response = await fetch(
    getUploadItemURL({ fileName: file.name, path: path }),
    {
      method: "PUT",
      body: file,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": file.type,
      },
    }
  ).then((res) => res?.json());
  if (response?.error) {
    console.log(response.error);
    return Response.json(
      { error: { message: "500 Internal Server Error" } },
      { status: 500 }
    );
  }
  return Response.json(response);
}

export async function PUT(request: NextRequest) {
  const formData = await request.formData();
}
