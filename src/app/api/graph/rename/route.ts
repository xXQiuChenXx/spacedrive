import { getToken } from "@/lib/oAuthStore";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { config } from "@/config/api.config";

type RequestBody = {
  id: string;
  name: string;
};
export async function POST(request: NextRequest) {
  const body = (await request.json()) as RequestBody;
  console.log(body)
  if (!body.name )
    return Response.json({ error: { message: "400 Bad Request" } }, {status: 400});
  const token = await getToken();
  if (!token.length) return redirect("/setup");
  const { accessToken } = token[0];
  const res = await fetch(`${config.graphApi}/me/drive/items/${body.id}`, {
    method: "PATCH",
    body: JSON.stringify({ name: body.name }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) return Response.json(await res.json());
  else
    return Response.json(
      { error: { message: "500 Internal Server Error" } },
      { status: 500 }
    );
}
