import { ItemsResponse, OriResponse } from "@/lib/driveRequest";
import React from "react";
import PreviewContainer from "./PreviewContainer";

const TextPreview = ({
  content,
  file,
}: {
  content: string;
  file: OriResponse | ItemsResponse;
}) => {
  return (
    <PreviewContainer file={file}>
      <pre className="break-words text-wrap">{content || "(The file is empty)"}</pre>
    </PreviewContainer>
  );
};

export default TextPreview;
