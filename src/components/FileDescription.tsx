"use client";
import { type OriResponse } from "@/lib/driveRequest";
import { Button } from "@/components/ui/button";
import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatBytes, formatDate } from "@/lib/utils";
import { downloadSingleFile } from "@/lib/downloadHandler";
import { usePathname } from "next/navigation";
import { FileIcon } from "@/components/icons/FileIcon";

const FileDescription = ({
  file,
  children,
}: {
  file: OriResponse;
  children: ReactNode;
}) => {
  const pathname = usePathname();
  return (
    <div className="mt-3 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto flex space-y-10  flex-col">
      <Card className="md:py-3 md:px-5">
        <CardHeader>
          <CardTitle>File Information</CardTitle>
          <CardDescription>Detailed file information goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="border w-full md:w-fit text-center flex items-center justify-center flex-col px-8 py-20 break-all rounded-lg">
              <FileIcon
                className="mb-2 size-7"
                fileName={file.name}
                isVideo={Boolean(file?.video)}
              />
              <p className="md:w-32">{file.name}</p>
            </div>
            <div className="flex flex-col p-2.5">
              <div className="py-1 max-w-sm lg:max-w-lg">
                <p className="text-muted-foreground">File Name:</p>
                <p className="truncate">{file.name}</p>
              </div>
              <div className="py-1">
                <p className="text-muted-foreground">File Size:</p>
                <p className="truncate">{formatBytes(file.size)}</p>
              </div>
              <div className="py-1">
                <p className="text-muted-foreground">Created At:</p>
                <p className="truncate">
                  {file.createdDateTime
                    ? formatDate(file.createdDateTime)
                    : "none"}
                </p>
              </div>
              <div className="py-1">
                <p className="text-muted-foreground">Last Modified:</p>
                <p className="truncate">
                  {formatDate(file.lastModifiedDateTime)}
                </p>
              </div>
              <div className="py-1">
                <p className="text-muted-foreground">MIME type</p>
                <p className="truncate">{file.file?.mimeType || "none"}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-4 w-full md:mx-auto md:w-fit">
          <Button
            type="button"
            title="download"
            variant="outline"
            className="w-full md:w-fit"
            onClick={(e) => {
              downloadSingleFile({
                item: { id: file.id, name: file.name },
              });
            }}
          >
            Download
          </Button>
          <Button
            type="button"
            title="share"
            variant="outline"
            className="flex-1"
            onClick={() => {
              navigator.clipboard.writeText(window.location.origin + pathname);
            }}
          >
            Copy link
          </Button>
          <Button
            type="button"
            title="share"
            variant="outline"
            className="flex-1"
          >
            Copy Shorten link
          </Button>
        </CardFooter>
      </Card>
      {children}
    </div>
  );
};

export default FileDescription;
