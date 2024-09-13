import { getCachedUser } from "@/lib/oAuthHandler";
import { redirect } from "next/navigation";

export default async function Home() {
  const token = await getCachedUser();
  if (!token) return redirect("/setup");
  return redirect("/home");
}
