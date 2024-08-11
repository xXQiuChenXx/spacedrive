import { config } from "@/config/api.config";

export const getUrlFromPath = (path?: string): string => {
  const isRoot = path?.length ? `:` : "";
  return `${config.graphApi}/me/drive/root${isRoot}${
    path?.length ? `/${path}` : ""
  }${isRoot}/children`;
};