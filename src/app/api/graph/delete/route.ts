import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { config } from "@/config/api.config";
import { getCachedToken } from "@/lib/oAuthHandler";

type RequestBody = {
  id: string;
  name: string;
};
export async function POST(request: NextRequest) {
  const body = (await request.json()) as RequestBody;
  if (!body.name)
    return Response.json(
      { error: { message: "400 Bad Request" } },
      { status: 400 }
    );
  const token = await getCachedToken();
  if (!token) return redirect("/setup");
  const { accessToken } = token;
  const res = await fetch(`${config.graphApi}/me/drive/items/${body.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) return Response.json({ success: true });
  else
    return Response.json(
      { error: { message: "500 Internal Server Error" } },
      { status: 500 }
    );
}
