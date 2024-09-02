import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { config } from "@/config/api.config";
import { getCachedToken } from "@/lib/oAuthHandler";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const id = params.get("id");
  const name = params.get("name");
  if (!name)
    return Response.json(
      { error: { message: "400 Bad Request" } },
      { status: 400 }
    );
  const token = await getCachedToken();
  if (!token) return redirect("/setup");
  const { accessToken } = token;
}
