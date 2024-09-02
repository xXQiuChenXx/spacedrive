import { exchangeCode } from "@/lib/oAuthHandler";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { saveTokenToDB } from "@/lib/oAuthStore";

export async function GET(request: NextRequest) {
  const searchParmas = request.nextUrl.searchParams;
  const code = searchParmas.get("code");

  if (!code) return redirect("/setup/step-3?error=Code Not Found");

  try {
    const { access_token, refresh_token, expires_in } = await exchangeCode(
      code
    );

    await saveTokenToDB({
      accessToken: access_token,
      refreshToken: refresh_token,
      expiredIn: expires_in,
      issuedAt: Math.floor(Date.now() / 1000),
    });
  } catch (error) {
    console.log(error);
    return redirect("/setup/step-3?error=Unknown Error");
  }

  redirect("/setup/step-3");
}
