"use client";
import { ItemsResponse, OriResponse } from "@/lib/driveRequest";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import PreviewContainer from "./PreviewContainer";

export const AudioPreview = ({
  file,
}: {
  file: OriResponse | ItemsResponse;
}) => {
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  return (
    <PreviewContainer file={file}>
      <div className="w-fit mx-auto mt-5">
        <ReactPlayer url={`${origin}/api/graph/raw?item=${file.id}`} controls />
      </div>
    </PreviewContainer>
  );
};
