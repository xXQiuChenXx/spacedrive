import Footer from "@/components/Footer";
import { SiteHeader } from "@/components/header/SiteHeader";
import { getCachedUser } from "@/lib/oAuthHandler";
import { decrypt } from "@/lib/security";
import { cookies } from "next/headers";
import { Fragment, ReactNode } from "react";

type UserData = { isAdmin: boolean; path: string[] };

const HomeLayuot = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  let user_data: UserData = {
    isAdmin: false,
    path: [],
  };

  if (session) {
    const userInfo = await getCachedUser();
    const decrypted = await decrypt(session);
    if (decrypted?.userId)
      user_data.isAdmin = decrypted.userId === userInfo?.userId;
    if (decrypted?.path) user_data.path.concat(decrypted.path as string[]);
  }

  return (
    <Fragment>
      <SiteHeader user={user_data} showNav />
      {children}
      <Footer />
    </Fragment>
  );
};

export default HomeLayuot;
