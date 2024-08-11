import { getUrlFromPath } from "./graphAPI";

type Props = {
  folder?: string[];
  access_token: string;
  refresh_token: string;
};
export const getItems = async ({
  folder,
  access_token,
}: Props): Promise<any> => {
  const url = getUrlFromPath(folder?.join("/"));

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-store",
  }).then((res) => res.json());

  if (!response?.error || response?.error?.code === "itemNotFound")
    return response.value;
};
