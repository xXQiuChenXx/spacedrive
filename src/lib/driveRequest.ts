import { generateRequestUrl } from "./graphAPI";
import { config } from "@/config/api.config";

type Props = {
  folder?: string[];
  access_token: string;
};

export type OriResponse = {
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
}: Props): Promise<ItemsResponse[] | ErrorResponse> => {
  const requestUrl = generateRequestUrl(folder);
  const params = new URLSearchParams({
    select: "name,id,size,lastModifiedDateTime,folder,file,video,image",
  });

  const response = await fetch(`${requestUrl}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-store",
  }).then((res) => res.json());

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
  } else {
    console.log(response.error);
    return response;
  }
};
