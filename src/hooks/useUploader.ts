import { getCachedToken, refreshItems } from "@/lib/fns";
import { getUploadItemURL } from "@/lib/graphAPI";
import { Dispatch, SetStateAction, useTransition } from "react";
import { toast } from "sonner";

async function upload({
  file,
  path,
  accessToken,
}: {
  file: File;
  path: string;
  accessToken: string;
}) {
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

export function useUploader({
  isAdmin,
  path,
}: {
  isAdmin: boolean;
  path: string;
}) {
  const [isUploading, startUploading] = useTransition();
  function uploadFile({ files }: { files: File[] }) {
    if (!isAdmin) return;
    startUploading(async () => {
      const accessToken = await getCachedToken();
      if (accessToken && isAdmin) {
        for (const file of files) {
          const { error } = await upload({ file, accessToken, path });
          if (error) {
            toast.error(error);
          } else {
            toast.success(`Uploaded ${file.name}`);
          }
        }

        await refreshItems();
      }
    });
  }
  return { isUploading, uploadFile };
}
