import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { config } from "@/config/api.config";
import { getCachedToken } from "@/lib/oAuthHandler";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const id = params.get("id");
  const name = params.get("name");
  if (!name || name?.toLocaleLowerCase() === ".password")
    return Response.json(
      { error: { message: "400 Bad Request" } },
      { status: 400 }
    );
  const token = await getCachedToken();
  if (!token) return redirect("/setup");
  const { accessToken } = token;
  const res = await fetch(`${config.graphApi}/me/drive/items/${id}/content`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": request.headers.get("Content-Type") as string,
    },
  });
  const headers = new Headers();
  headers.append("Content-Disposition", `attachment; filename=${name}`);
  headers.append("Content-Type", request.headers.get("Content-Type") as string);
  if (res.ok) return new Response(await res.blob(), { headers });
  else
    return Response.json(
      { error: { message: "500 Internal Server Error" } },
      { status: 500 }
    );
}
