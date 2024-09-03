import DataRoute from "@/components/DataRoute";
import DataTable from "@/components/DataTable";
import FileDescription from "@/components/FileDescription";
import ReadMePreview from "@/components/preview/readme";
import { notFound, redirect } from "next/navigation";
import { getCachedToken } from "@/lib/oAuthHandler";
import { getInformations } from "@/lib/fns";

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

  const { item, items, readmeContent } = await getInformations({
    accessToken,
    params: params.folder,
  });

  if (!items && !item) return notFound();

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
export const dynamic = "force-dynamic";
