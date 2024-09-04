"use client";
import { ItemsResponse, OriResponse } from "@/lib/driveRequest";
import PreviewContainer from "./PreviewContainer";
import { useEffect, useState } from "react";

export const PDFPreview = ({
  file,
}: {
  file: OriResponse | ItemsResponse;
}) => {
    const [origin, setOrigin] = useState("");
    useEffect(() => {
        setOrigin(window.location.origin)
    }, [])
  const filePath = encodeURI(origin + "/api/graph/raw?item=" + file.id);
  const url = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${filePath}`;
  return (
    <PreviewContainer file={file}>
      <iframe className="h-lvh" src={url} width="100%" height="100%" title="pdf-viewer"></iframe>
    </PreviewContainer>
  );
};

