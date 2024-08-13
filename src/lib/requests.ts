import { generateRequestUrl } from "./graphAPI";
import { config } from "@/config/api.config";

export interface ItemsResponse {
  value: Item[];
}

export type Item = {
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

export type SearchParams = {
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
  searchParams: SearchParams
};

export const getItems = async ({
  folder,
  access_token,
  searchParams,
}: Props): Promise<{ data: Item[], pageCount: number }> => {
  const requestUrl = generateRequestUrl(folder);
  const params = new URLSearchParams({
    select: "name,id,size,lastModifiedDateTime,folder,file,video,image",
  });

  const response = await fetch(`${requestUrl}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-store",
  }).then((res) => res.json());

  // return response;

  // if (!response?.error || response?.error?.code === "itemNotFound")
  //   return response.value;

  return filterItems({ data: response.value, searchParams });
};

type FilterItemsReturns = {
  data: Item[];
  pageCount: number;
};
export const filterItems = ({
  data,
  searchParams,
}: {
  data: Item[];
  searchParams: SearchParams;
}): FilterItemsReturns => {
  const { page, per_page, sort, name, from, to } = searchParams;
  if (sort && sort === "lastModifiedDateTime") {
    data = data.sort((a, b) => {
      return (
        new Date(b.lastModifiedDateTime).getTime() -
        new Date(a.lastModifiedDateTime).getTime()
      );
    });
  }
  const pageCount = Math.ceil(data.length / Number(per_page));
  const startIndex = (Number(page) - 1) * Number(per_page);
  const endIndex = startIndex + Number(per_page);
  data = data.slice(startIndex, endIndex);

  return { pageCount, data };
};
