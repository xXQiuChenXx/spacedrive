import { getCachedToken } from "@/lib/oAuthHandler";
import { redirect } from "next/navigation";

export default async function Home() {
  const token = await getCachedToken();
  if(!token ) return redirect("/setup");
  return redirect("/home")
}
