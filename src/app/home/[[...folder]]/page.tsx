import DataRoute from "@/components/DataRoute";
import FileDescription from "@/components/FileDescription";
import { MarkdownPreview } from "@/components/preview/Markdown";
import { notFound } from "next/navigation";
import { getInformations } from "@/lib/home/all";
import { Suspense } from "react";
import PreviewFile from "@/components/preview/PreviewFile";
import { ItemsResponse } from "@/lib/driveRequest";
import { Loader } from "@/components/Loader";
import { TableShell } from "@/components/table/TableShell";

const HomePage = async ({
  params,
  searchParams,
}: {
  params: { folder: string[] };
  searchParams: {}; // todo: pagination
}) => {
  const { item, items, readmeContent, readmeFile, isAdmin } =
    await getInformations({
      params: params.folder,
    });

  if (!items && !item) return notFound();

  return (
    <div className="px-5 md:container py-8 mt-5 flex-grow">
      <DataRoute />
      <Suspense fallback={<Loader />}>
        {items ? (
          <TableShell data={items} isAdmin={isAdmin}>
            {readmeContent && (
              <MarkdownPreview
                content={readmeContent}
                file={readmeFile as ItemsResponse}
              />
            )}
          </TableShell>
        ) : (
          item && (
            <FileDescription file={item}>
              <PreviewFile file={item} />
            </FileDescription>
          )
        )}
      </Suspense>
    </div>
  );
};

export default HomePage;

export const dynamicParams = true;
export const dynamic = "force-dynamic";
