"use client";
import { type OriResponse } from "@/lib/driveRequest";
import Image from "next/image";
import PreviewContainer from "./PreviewContainer";
import { useEffect, useState } from "react";

export const ImagePreview = ({ file }: { file: OriResponse }) => {
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  return (
    <PreviewContainer file={file}>
      <Image
        loader={({ src }) => src}
        src={`${origin}/api/graph/raw?item=${file.id}`}
        alt="image-preview"
        width={file.image?.width}
        height={file.image?.height}
        // layout="responsive"
        className="rounded-lg shadow-md"
        priority={false}
      />
    </PreviewContainer>
  );
};
