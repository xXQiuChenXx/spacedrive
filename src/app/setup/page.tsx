import { getCachedUser } from "@/lib/oAuthHandler";
import { redirect } from "next/navigation";

const Setup = async () => {
  const token = await getCachedUser();
  if (!token?.refreshToken) return redirect("/setup/step-1");
  return redirect("/home");
};

export default Setup;
