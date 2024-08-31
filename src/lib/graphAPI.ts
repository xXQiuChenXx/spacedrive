import { config } from "@/config/api.config";

export const getItemRequestURL = (
  path: string[] | string = "/",
  listChild?: boolean
): string => {
  // const isRoot = path?.length ? `:` : "";
  // const location = path?.length ? `/${path.join("/")}` : "";
  const location = typeof path === "string" ? path : `/${path.join("/")}`;
  const isRoot = path === "/" ? "" : ":";
  if (listChild) {
    return `${config.graphApi}/me/drive/root${isRoot}${location}${isRoot}/children`;
  } else {
    return `${config.graphApi}/me/drive/root${isRoot}${location}`;
  }
};

export const getUploadItemURL = ({
  path,
  fileName,
}: {
  path: string;
  fileName: string;
}): string => {
  const isRoot = path === "/" ? "" : ":";

  return `${config.graphApi}/me/drive/root${isRoot}${path}/${fileName}${isRoot}/content`;
};
