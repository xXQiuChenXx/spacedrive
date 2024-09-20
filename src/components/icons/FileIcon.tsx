import { getFileExtension, extensions } from "@/lib/icon/getFileType";
import { fileIconsTheme } from "./fileIconsTheme";

export const FileIcon = ({
  fileName,
  isVideo,
  isFolder,
  ...props
}: {
  fileName: string;
  isVideo?: boolean;
  isFolder?: boolean;
} & React.SVGProps<SVGSVGElement>): JSX.Element => {
  if (isFolder) return <fileIconsTheme.folder {...props} />;
  const extension = getFileExtension(fileName);
  if (extensions[extension]) {
    // Files with '.ts' extensions may be TypeScript files or TS Video files, we check for the flag 'video'
    // to determine which icon to render for '.ts' files.
    if (extension === "ts" && isVideo)
      return <fileIconsTheme.video {...props} />;
    const DefaultComponent = extensions[extension];
    return <DefaultComponent {...props} />;
  } else {
    return <fileIconsTheme.file {...props} />;
  }
};
