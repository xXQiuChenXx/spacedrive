import { getItems, ItemsResponse } from "@/lib/driveRequest";
import { validateToken } from "@/lib/oAuthHandler";
import { getToken } from "@/lib/oAuthStore";
import { Shell } from "lucide-react";
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
  })) as ItemsResponse[];

  return;
  <Shell>test </Shell>;
};

export default HomePage;

export const dynamicParams = true;
