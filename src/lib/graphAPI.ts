import { config } from "@/config/api.config";

export const getItemRequestURL = (path?: string[], listChild?: boolean): string => {
  const isRoot = path?.length ? `:` : "";
  const location = path?.length ? `/${path.join("/")}` : "";
  if (listChild) {
    return `${config.graphApi}/me/drive/root${isRoot}${location}${isRoot}/children`;
  } else {
    return `${config.graphApi}/me/drive/root${isRoot}${location}`;
  }
};