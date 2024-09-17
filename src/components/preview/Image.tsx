"use client";

import { type OriResponse } from "@/lib/driveRequest";
import Image from "next/image";
import PreviewContainer from "./PreviewContainer";

export const ImagePreview = ({
  file,
  origin,
}: {
  file: OriResponse;
  origin: string;
}) => {
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
