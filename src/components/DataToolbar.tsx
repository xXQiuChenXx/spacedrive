"use client";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { type Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  UploadIcon,
  DownloadIcon,
  PlusIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import CreateFolderDialog from "./action-dialog/CreateFolderDialog";
import { usePathname } from "next/navigation";
import { ItemsResponse } from "@/lib/driveRequest";
import { LoaderIcon } from "lucide-react";

export const DataTableToolbar = ({
  table,
  onDownloadClick,
  isDownloading,
  setShowDeleteDialog,
  uploadFile,
  isAdmin,
  isUploading,
}: {
  table: Table<ItemsResponse>;
  setShowDeleteDialog: Dispatch<SetStateAction<boolean>>;
  isAdmin: boolean;
  uploadFile: ({ files }: { files: File[] }) => void;
  isDownloading: boolean;
  isUploading: boolean;
  onDownloadClick: () => void;
}) => {
  const pathname = usePathname().replace("home/", "").replace("home", "");
  const [isCreateFolderDialogOpen, setIsCreateFolderDialogOpen] =
    useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function uploadInputChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target?.files?.[0];
    if (file) uploadFile({ files: [file] });
  }

  return (
    <div className="flex flex-col md:flex-row gap-y-4 w-full md:items-center justify-between md:space-x-2 overflow-auto p-1">
      <div className="flex flex-1 items-center space-x-2 w-full">
        <Input
          placeholder="Filter File Name..."
          value={(table.getColumn("file")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("file")?.setFilterValue(event.target.value)
          }
          className="h-8 p-4 md:w-40 lg:w-64"
        />
      </div>
      {isAdmin && (
        <div className="flex items-center md:gap-2 w-full md:w-fit gap-4">
          <CreateFolderDialog
            pathname={pathname}
            open={isCreateFolderDialogOpen}
            onOpenChange={setIsCreateFolderDialogOpen}
            onSuccess={() => table.toggleAllPageRowsSelected(false)} // cancel all selection after created
          />
          <Button
            size="sm"
            variant="outline"
            className="w-1/2 md:w-fit md:ml-auto h-8 flex items-center py-4"
            aria-label="Donwload"
            onClick={() => setIsCreateFolderDialogOpen(true)}
          >
            <PlusIcon className="size-4 mr-2" />
            Create Folder
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-1/2 md:w-fit md:ml-auto h-8 flex items-center py-4"
            aria-label="Upload"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <LoaderIcon className="animate-spin mr-2 size-4" />
            ) : (
              <UploadIcon className="size-4 mr-2" />
            )}
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="ml-auto hidden h-8 lg:flex"
            aria-label="Donwload"
            onClick={() => onDownloadClick}
            disabled={!table.getIsSomeRowsSelected() || isDownloading}
          >
            {isDownloading ? (
              <LoaderIcon className="animate-spin mr-2 size-4" />
            ) : (
              <DownloadIcon className="size-4 mr-2" />
            )}
            {isDownloading ? "Downloading" : "Download"}
          </Button>
          <Input
            type="file"
            ref={fileInputRef}
            className="hidden"
            hidden
            onChange={uploadInputChange}
          />
          <Button
            size="sm"
            variant="outline"
            className="ml-auto hidden h-8 md:flex"
            aria-label="Upload"
            onClick={() => setShowDeleteDialog(true)}
            disabled={!table.getIsSomeRowsSelected()}
          >
            <Cross2Icon className="size-4 mr-2" />
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};
