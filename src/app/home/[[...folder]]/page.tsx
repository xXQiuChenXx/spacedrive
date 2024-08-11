import { getItems, ItemsResponse } from "@/lib/driveRequest";
import { validateToken } from "@/lib/oAuthHandler";
import { getToken } from "@/lib/oAuthStore";
import { redirect } from "next/navigation";
import { data } from "@/lib/temp";
import { Shell } from "@/components/Shell";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { ItemsTable } from "@/components/main/item-table";

const HomePage = async ({
  params,
  searchParams,
}: {
  params: { folder: string[] };
  searchParams: {};
}) => {
  // const token = await getToken();
  // if (!token.length) return redirect("/setup");
  // const { accessToken, refreshToken } = token[0];
  // await validateToken({ accessToken, refreshToken });
  // const items = (await getItems({
  //   access_token: accessToken,
  //   folder: params.folder,
  // })) as ItemsResponse[];

  return (
    <Shell>
      <Suspense
        fallback={
          <DataTableSkeleton
            columnCount={3}
            searchableColumnCount={1}
            filterableColumnCount={2}
            cellWidths={["40rem", "12rem", "12rem"]}
            shrinkZero
          />
        }
      >
        <ItemsTable tableData={data} />
      </Suspense>
    </Shell>
  );
};

export default HomePage;

export const dynamicParams = true;
