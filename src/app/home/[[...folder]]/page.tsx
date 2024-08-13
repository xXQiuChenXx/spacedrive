import {
  filterItems,
  getItems,
  SearchParams,
  ItemsResponse,
  Item,
} from "@/lib/requests";
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
  searchParams: SearchParams;
}) => {
  const token = await getToken();
  if (!token.length) return redirect("/setup");
  const { accessToken, refreshToken } = token[0];
  // await validateToken({ accessToken, refreshToken });
  const itemsPromise = getItems({
    access_token: accessToken,
    folder: params.folder,
    searchParams
  });
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
        <ItemsTable itemsPromise={itemsPromise} />
      </Suspense>
    </Shell>
  );
};

export default HomePage;

export const dynamicParams = true;
