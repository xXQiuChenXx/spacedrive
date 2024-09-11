import { apiConfig } from "@/config/api.config";
import { getCachedToken } from "@/lib/oAuthHandler";
import { validateAPIConfig } from "@/lib/setups";
import { redirect } from "next/navigation";

const Setup = () => {
  const validate = validateAPIConfig({ config: apiConfig });
  if (!validate.success) return redirect("/setup/step-1");
  const token = getCachedToken();
  if (!token) return redirect("/setup/step-2");
  return redirect("/home");
};

export default Setup;
