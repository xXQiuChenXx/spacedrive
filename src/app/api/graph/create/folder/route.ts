import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { getItemRequestURL } from "@/lib/graphAPI";
import { getCachedToken } from "@/lib/oAuthHandler";

type RequestBody = {
  path: string;
  newFolder: string;
};
export async function POST(request: NextRequest) {
  const body = (await request.json()) as RequestBody;
  if (!body.newFolder || !body.path)
    return Response.json(
      { error: { message: "400 Bad Request" } },
      { status: 400 }
    );
  const token = await getCachedToken();
  if (!token) return redirect("/setup");
  const { accessToken } = token;
  const res = await fetch(`${getItemRequestURL(body.path, true)}`, {
    method: "POST",
    body: JSON.stringify({
      name: body.newFolder,
      folder: {},
      "@microsoft.graph.conflictBehavior": "rename",
    }),
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

export async function PUT(request: NextRequest) {
  const formData = await request.formData();
}
