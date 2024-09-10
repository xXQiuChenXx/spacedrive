import { getUploadItemURL } from "@/lib/graphAPI";

export async function uploadFile({
  formdata,
  accessToken,
}: {
  formdata: FormData;
  accessToken: string;
}) {
  const file = formdata.get("file") as File;
  const path = formdata.get("path") as string;

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
  return {
    data: response?.error ? null : response,
    error: response?.error?.message,
  };
}
