"use client";
import { ItemsResponse, OriResponse } from "@/lib/driveRequest";
import ReactPlayer from "react-player";
import PreviewContainer from "./PreviewContainer";

export const VideoPreview = ({
  file,
  origin,
}: {
  origin: string;
  file: OriResponse | ItemsResponse;
}) => {
  return (
    <PreviewContainer file={file}>
      <div className="w-fit mx-auto mt-5 relative">
        <ReactPlayer
          url={`${origin}/api/graph/raw?item=${file.id}`}
          controls
          width="100%"
          height="100%"
        />
      </div>
    </PreviewContainer>
  );
};
