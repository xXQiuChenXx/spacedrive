import { getCachedUser } from "@/lib/oAuthHandler";
import { NextRequest, NextResponse } from "next/server";
import { apiConfig } from "@/config/api.config";

export async function POST(request: NextRequest) {
  const { q } = await request.json();
  if (!q) return NextResponse.json([]);

  const user = await getCachedUser();
  if (!user?.accessToken) return NextResponse.json([]);
  const params = new URLSearchParams({
    select: "id,file,parentReference,name",
    top: "10",
  });
  const searchResponse = await fetch(
    `${apiConfig.graphApi}/me/drive/root/search(q='${q}')?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    }
  ).then((res) => res.json());
  if (searchResponse?.value) {
    const pms = searchResponse.value.map(async (res: any) => {
      const response = await fetch(
        `${apiConfig.graphApi}/me/drive/items/${res.parentReference.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
        }
      ).then((res) => res.json());
      return {
        name: res.name,
        isFile: Boolean(res.file),
        mimeType: res?.file?.mimeType,
        path:
          response.name === "root"
            ? "/home"
            : `/home${response.parentReference.path.replace(
                "/drive/root:",
                ""
              )}/${response.name}`,
      };
    });
    const data = await Promise.all(pms);
    return NextResponse.json(data);
  }
  return NextResponse.json([]);
}
