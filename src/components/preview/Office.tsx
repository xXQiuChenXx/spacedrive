"use client";

import { ItemsResponse, OriResponse } from "@/lib/driveRequest";
import PreviewContainer from "./PreviewContainer";

export const OfficePreview = ({
  file,
  origin,
}: {
  origin: string;
  file: OriResponse | ItemsResponse;
}) => {
  const filePath = `${origin}/api/graph/raw?item=${file.id}`;
  const url = `https://view.officeapps.live.com/op/embed.aspx?src=${filePath}`;
  return (
    <PreviewContainer file={file}>
      <iframe
        className="h-lvh"
        src={url}
        width="100%"
        height="100%"
        title="pdf-viewer"
      ></iframe>
    </PreviewContainer>
  );
};
