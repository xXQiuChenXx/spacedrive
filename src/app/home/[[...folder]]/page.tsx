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
    
  return <div>HomePage</div>;
};

export default HomePage;

export const dynamicParams = true;
