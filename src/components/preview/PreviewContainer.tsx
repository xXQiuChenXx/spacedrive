import { ItemsResponse, OriResponse } from "@/lib/driveRequest";
import React, { ReactNode, Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { Loader } from "../Loader";
import { FileIcon } from "@/components/icons/FileIcon";

const PreviewContainer = ({
  children,
  file,
}: {
  children: ReactNode;
  file: ItemsResponse | OriResponse;
}) => {
  return (
    <div className="rounded-lg border bg-card shadow-sm py-6 px-2 md:px-5 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl w-full mx-auto text-wrap">
      <div className="flex items-center">
        <FileIcon
          fileName={file.name}
          className="size-4 md:size-5 mr-2 md:ml-4"
          isVideo={Boolean(file?.video)}
        />
        <p className="font-bold w-full truncate">{file.name}</p>
      </div>
      <Separator className="my-3" />
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
};

export default PreviewContainer;
