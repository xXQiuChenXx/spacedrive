import { type OriResponse } from "@/lib/driveRequest";
import Image from "next/image";
import PreviewContainer from "./PreviewContainer";

const ImagePreview = ({ file }: { file: OriResponse }) => {
  return (
    <PreviewContainer file={file}>
      <Image
        src={`/api/graph/raw?item=${file.id}`}
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

export default ImagePreview;
