import DataRoute from "@/components/DataRoute";
import DataTable from "@/components/DataTable";
import FileDescription from "@/components/FileDescription";
import ReadMePreview from "@/components/preview/readme";
import { getFileContent, getItems, ItemsResponse, OriResponse } from "@/lib/driveRequest";
import { validateToken } from "@/lib/oAuthHandler";
import { getToken } from "@/lib/oAuthStore";
import { redirect } from "next/navigation";

const HomePage = async ({
  params,
  searchParams,
}: {
  params: { folder: string[] };
  searchParams: {};
}) => {
  const token = await getToken();
  if (!token.length) return redirect("/setup");
  const { accessToken, refreshToken } = token[0];
  // await validateToken({ accessToken, refreshToken });
  const items = (await getItems({
    access_token: accessToken,
    folder: params.folder,
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
      folder: params.folder,
      row: true,
    })) as OriResponse;
  }

  if (readmeFile) {
    const file = await getItems({
      access_token: accessToken,
      folder: params.folder.concat([readmeFile.name]),
      row: true
    }) as OriResponse;
    readmeContent = await getFileContent(file, accessToken);
  }

  console.log(items ?? item);

  return (
    <div className="container py-8 mt-5">
      <DataRoute />
      {items ? <DataTable data={items} /> : <FileDescription data={item} />}
      {readmeContent && <ReadMePreview content={readmeContent} />}
    </div>
  );
};

export default HomePage;

export const dynamicParams = true;
