import { apiConfig } from "@/config/api.config";

export const getItemRequestURL = (
  path: string[] | string = "/",
  listChild?: boolean
): string => {
  const location = typeof path === "string" ? path : `/${path.join("/")}`;
  const isRoot = path === "/" ? "" : ":";
  if (listChild) {
    return `${apiConfig.graphApi}/me/drive/root${isRoot}${location}${isRoot}/children`;
  } else {
    return `${apiConfig.graphApi}/me/drive/root${isRoot}${location}`;
  }
};

export const getUploadItemURL = ({
  path,
  fileName,
}: {
  path: string;
  fileName: string;
}): string => {
  return `${apiConfig.graphApi}/me/drive/root:${
    path === "/" ? "" : path
  }/${fileName}:/content`;
};
