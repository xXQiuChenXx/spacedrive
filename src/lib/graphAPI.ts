import { config } from "@/config/api.config";

export const generateRequestUrl = (path?: string[]): string => {
  const isRoot = path?.length ? `:` : "";
  const location = path?.length ? `/${path.join("/")}` : "";
  return `${config.graphApi}/me/drive/root${isRoot}${location}${isRoot}/children`;
};