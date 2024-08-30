import DataRoute from "@/components/DataRoute";
import DataTable from "@/components/DataTable";
import FileDescription from "@/components/FileDescription";
import { getItems, ItemsResponse, OriResponse } from "@/lib/driveRequest";
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

  if (!items) {
    item = (await getItems({
      access_token: accessToken,
      folder: params.folder,
      row: true,
    })) as OriResponse;
  }

  console.log(items ?? item);

  return (
    <div className="container py-8 mt-10">
      <DataRoute />
      {items ? <DataTable data={items} /> : <FileDescription data={item} />}
    </div>
  );
};

export default HomePage;

export const dynamicParams = true;
