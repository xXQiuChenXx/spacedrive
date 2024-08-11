import { getUrlFromPath } from "./graphAPI";

type Props = {
  folder?: string[];
  access_token: string;
};
export const getItems = async ({
  folder,
  access_token,
}: Props): Promise<any> => {
  const requestUrl = getUrlFromPath(folder?.join("/"));
  const params = new URLSearchParams({
    select: "name,id,size,lastModifiedDateTime,folder,file,video,image",
  });

  const response = await fetch(`${requestUrl}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-store",
  }).then((res) => res.json());

  if (!response?.error || response?.error?.code === "itemNotFound")
    return response.value;
};
