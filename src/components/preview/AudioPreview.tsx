"use client"
import { ItemsResponse, OriResponse } from "@/lib/driveRequest";
import ReactPlayer from "react-player";
import PreviewContainer from "./PreviewContainer";
import { apiConfig } from "@/config/api.config";

export const AudioPreview = ({
  file,
}: {
  file: OriResponse | ItemsResponse;
}) => {
  return (
    <PreviewContainer file={file}>
      <div className="w-fit mx-auto mt-5">
        <ReactPlayer url={`${apiConfig.origin}/api/graph/raw?item=${file.id}`} controls />
      </div>
    </PreviewContainer>
  );
};
