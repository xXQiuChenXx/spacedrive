import {
  getFileContent,
  getItems,
  ItemsResponse,
  OriResponse,
} from "@/lib/driveRequest";

export async function getInformations({
  accessToken,
  params,
}: {
  accessToken: string;
  params: string[];
}) {
  const items = (await getItems({
    access_token: accessToken,
    folder: params,
    listChild: true,
  })) as ItemsResponse[];

  

  let item;
  let readmeFile = items?.find(
    (item) => item.name.toLowerCase() === "readme.md"
  );
  let readmeContent;

  if (!items) {
    item = (await getItems({
      access_token: accessToken,
      folder: params,
      row: true,
    })) as OriResponse;
  }

  if (readmeFile) {
    const file = (await getItems({
      access_token: accessToken,
      folder: params.concat([readmeFile.name]),
      row: true,
    })) as OriResponse;
    readmeContent = await getFileContent(file, accessToken);
  }

  return { items, item, readmeContent };
}
