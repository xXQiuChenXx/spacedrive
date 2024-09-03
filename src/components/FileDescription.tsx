"use client";
import { type OriResponse } from "@/lib/driveRequest";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatBytes, formatDate } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import { handleClick } from "@/lib/downloadHandler";
import { usePathname } from "next/navigation";

const FileDescription = ({ data }: { data: OriResponse | undefined }) => {
  const pathname = usePathname();

  if (!data) return notFound();
  return (
    <div className="mt-3">
      <Card className="md:py-3 md:px-5 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>File Information</CardTitle>
          <CardDescription>Detailed file information goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="border w-full md:w-fit text-center flex items-center justify-center flex-col px-8 py-20 break-all rounded-lg">
              <FileIcon className="mb-2" />
              <p className="md:w-32">{data.name}</p>
            </div>
            <div className="flex flex-col p-2.5">
              <div className="py-1">
                <p className="text-muted-foreground">File Name:</p>
                <p className="truncate">{data.name}</p>
              </div>
              <div className="py-1">
                <p className="text-muted-foreground">File Size:</p>
                <p>{formatBytes(data.size)}</p>
              </div>
              <div className="py-1">
                <p className="text-muted-foreground">Created At:</p>
                <p>
                  {data.createdDateTime
                    ? formatDate(data.createdDateTime)
                    : "none"}
                </p>
              </div>
              <div className="py-1">
                <p className="text-muted-foreground">Last Modified:</p>
                <p>{formatDate(data.lastModifiedDateTime)}</p>
              </div>
              <div className="py-1">
                <p className="text-muted-foreground">MIME type</p>
                <p>{data.file?.mimeType || "none"}</p>
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
              handleClick({
                item: { id: data.id, name: data.name },
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
    </div>
  );
};

export default FileDescription;
