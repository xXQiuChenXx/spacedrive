import { exchangeCode } from "@/lib/oAuthHandler";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { db } from "@/db";
import { credentials } from "@/db/schema";
import { saveToken } from "@/lib/oAuthStore";

export async function GET(request: NextRequest) {
  const searchParmas = request.nextUrl.searchParams;
  const code = searchParmas.get("code");

  if (!code) {
    console.log("code not found");
    return redirect("/setup/step-3?error=Code Not Found");
  }
  try {
    const { access_token, refresh_token } = await exchangeCode(code);

    await saveToken({ accessToken: access_token, refreshToken: refresh_token });
  } catch (error) {
    console.log(error);
    return redirect("/setup/step-3?error=Unknown Error");
  }

  redirect("/setup/step-3");
}
