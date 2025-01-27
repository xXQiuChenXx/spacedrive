import { exchangeCode, getAccountInformation } from "@/lib/oAuthHandler";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { getUserFromDB, saveUserToDB, updateToken } from "@/lib/oAuthStore";
import { encrypt } from "@/lib/security";
import { revalidateTag } from "next/cache";
import { siteConfig } from "@/config/site.config";

export async function GET(request: NextRequest) {
  const searchParmas = request.nextUrl.searchParams;
  const code = searchParmas.get("code");

  if (!code) return redirect("/setup/step-2");

  const data = await exchangeCode(code);
  if (siteConfig.debug) console.log(data);
  if (!data?.access_token || !data.refresh_token)
    return redirect("/setup/step-3?error=" + data?.error);

  const information = await getAccountInformation(data.access_token); // get user id
  if (!information)
    return redirect(`/setup/step-3?error=account_information_failed`);

  const userInfo = await getUserFromDB().catch((err) => {});
  const encryptedToken = await encrypt({
    payload: { refreshToken: data.refresh_token },
  });

  if (userInfo) {
    // In case of old data exist and old token expired
    if (userInfo.userId !== information.id)
      return redirect("/setup/step-3?error=account_mismatch");
    await updateToken({ refresh_token: encryptedToken }).catch((err) => {
      return redirect("/setup/step-3?error=" + err.message);
    });
  } else {
    if (siteConfig.debug)
      console.log({
        mail: information.mail,
        refreshToken: encryptedToken,
        userId: information.id,
      });
    await saveUserToDB({
      mail: information.mail,
      refreshToken: encryptedToken,
      userId: information.id,
    }).catch((err) => {
      console.log(err);
      return redirect("/setup/step-3?error=" + err.message);
    });
  }
  await revalidateTag("token");
  return redirect("/setup/step-3");
}
