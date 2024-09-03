"use server";
import { revalidateTag } from "next/cache";
import { getItemRequestURL } from "./graphAPI";

type Props = {
  folder?: string[];
  access_token: string;
  listChild?: boolean;
  row?: boolean;
};

export type OriResponse = {
  "@odata.etag"?: string;
  "@microsoft.graph.downloadUrl"?: string;
  id: string;
  lastModifiedDateTime: string;
  name: string;
  folder?: {
    childCount: number;
  };
  file?: {
    hashes: Object;
    mimeType: string;
  };
  size: number;
  webURL?: string;
  createdDateTime?: string;
};

export type ItemsResponse = {
  "@odata.etag": string;
  id: string;
  lastModifiedDateTime: string;
  name: string;
  folder?: {
    childCount: number;
  };
  file: {
    name: string;
    isFolder: boolean;
    mimeType?: string;
  };
  size: number;
};

export type ErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

export const getItems = async ({
  folder,
  access_token,
  listChild,
  row,
}: Props): Promise<ItemsResponse[] | OriResponse | null> => {
  const requestUrl = getItemRequestURL(folder, listChild);
  const params = new URLSearchParams({
    select:
      "name,id,size,lastModifiedDateTime,folder,file,video,image,@microsoft.graph.downloadUrl",
  });

  const response = await fetch(`${requestUrl}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Cache-Control": "no-cache",
    },
    next: { tags: ["items"] },
  }).then((res) => res.json());

  if (row && !response?.error) return response;

  if (response?.value) {
    return response.value.map((x: OriResponse) => {
      return {
        ...x,
        file: {
          name: x.name,
          isFolder: !!x?.folder,
          mimeType: x.file?.mimeType,
        },
      };
    });
  }

  if (response?.error?.code === "InvalidAuthenticationToken")
    await revalidateTag("token");
  return null;
};

export const getFileContent = async (
  item: OriResponse,
  access_token: string
): Promise<string> => {
  if (!item["@microsoft.graph.downloadUrl"]) return "";
  const response = await fetch(item["@microsoft.graph.downloadUrl"], {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then((res) => res.text());

  return response;
};
