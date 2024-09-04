import DataRoute from "@/components/DataRoute";
import DataTable from "@/components/DataTable";
import FileDescription from "@/components/FileDescription";
import { MarkdownPreview } from "@/components/preview/Markdown";
import { notFound, redirect } from "next/navigation";
import { getCachedToken } from "@/lib/oAuthHandler";
import { getInformations } from "@/lib/fns";
import { Suspense } from "react";
import PreviewFile from "@/components/preview/PreviewFile";
import { ItemsResponse } from "@/lib/driveRequest";
import { LoaderIcon } from "lucide-react";

const HomePage = async ({
  params,
  searchParams,
}: {
  params: { folder: string[] };
  searchParams: {};
}) => {
  const token = await getCachedToken();
  if (!token) return redirect("/setup");
  const { accessToken } = token;

  const { item, items, readmeContent, readmeFile } = await getInformations({
    accessToken,
    params: params.folder,
  });

  if (!items && !item) return notFound();

  return (
    <div className="px-5 md:container py-8 mt-5">
      <DataRoute />
      <Suspense
        fallback={
          <div className="flex items-center">
            <LoaderIcon className="size-4 animate-spin" />
            <p>Loading...</p>
          </div>
        }
      >
        {items ? (
          <DataTable data={items}>
            {readmeContent && (
              <MarkdownPreview
                content={readmeContent}
                file={readmeFile as ItemsResponse}
              />
            )}
          </DataTable>
        ) : (
          <FileDescription file={item}>
            {item && <PreviewFile file={item} />}
          </FileDescription>
        )}
      </Suspense>
    </div>
  );
};

export default HomePage;

export const dynamicParams = true;
export const dynamic = "force-dynamic";
