import { generateRequestUrl } from "./graphAPI";
import { config } from "@/config/api.config";

export type ItemsResponse = {
  "@odata.etag": string;
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
};
export type ErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

type SearchParams = {
  page: string;
  per_page: string;
  sort: string;
  name: string;
  from: string;
  to: string;
};

type Props = {
  folder?: string[];
  access_token: string;
  searchParams: SearchParams;
};

export const getItems = async ({
  folder,
  access_token,
  searchParams,
}: Props): Promise<ItemsResponse[] | ErrorResponse> => {
  const { page, per_page, sort, name, from, to } = searchParams;

  const requestUrl = generateRequestUrl(folder);
  const params = new URLSearchParams({
    select: "name,id,size,lastModifiedDateTime,folder,file,video,image",
  });

  const response = await fetch(`${requestUrl}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-store",
  }).then((res) => res.json());

  return response;

  if (!response?.error || response?.error?.code === "itemNotFound")
    return response.value;
};
