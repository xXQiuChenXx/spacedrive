"use client";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useTransition,
} from "react";
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
import { toast } from "sonner";
import { uploadFile } from "@/lib/actions/uploadFile";
import { downloadMultiFiles } from "@/lib/MultiFileDownloader";
import path from "path";
import { LoaderIcon } from "lucide-react";
import { getCachedToken } from "@/lib/fns";

export const DataTableToolbar = ({
  table,
  setShowDeleteDialog,
  setIsPermissionDialogOpen,
  isAdmin,
}: {
  table: Table<ItemsResponse>;
  setShowDeleteDialog: Dispatch<SetStateAction<boolean>>;
  setIsPermissionDialogOpen: Dispatch<SetStateAction<boolean>>;
  isAdmin: boolean;
}) => {
  const pathname = usePathname().replace("home/", "").replace("home", "");
  const [isCreateFolderDialogOpen, setIsCreateFolderDialogOpen] =
    useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [isDownloading, startDownloadTransition] = useTransition();
  const folderName = path.basename(pathname);

  function uploadInputChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target?.files?.[0];
    if (file) {
      startTransition(async () => {
        const accessToken = await getCachedToken();
        if (!accessToken) toast.error("Failed to fetch token");
        else {
          const formdata = new FormData();
          formdata.append("file", file);
          formdata.append("path", pathname);
          const { error } = await uploadFile({ formdata, accessToken });

          if (error) {
            toast.error(error);
          } else {
            toast.success(file.name + " uploaded successfully");
          }
        }
      });
    }
  }
  function onDonwloadClick() {
    startDownloadTransition(async () => {
      const items = table
        .getSelectedRowModel()
        .rows.map((r) => r.original)
        .filter((item) => !item.file.isFolder);
      await downloadMultiFiles({ items, folderName }).catch((err) =>
        console.log(err)
      );
    });
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
          onClick={() => {
            isAdmin
              ? setIsCreateFolderDialogOpen(true)
              : setIsPermissionDialogOpen(true);
          }}
        >
          <PlusIcon className="size-4 mr-2" />
          Create Folder
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="w-1/2 md:w-fit md:ml-auto h-8 flex items-center py-4"
          aria-label="Upload"
          onClick={() => {
            isAdmin
              ? fileInputRef.current?.click()
              : setIsPermissionDialogOpen(true);
          }}
          disabled={isPending}
        >
          {isPending ? (
            <LoaderIcon className="animate-spin mr-2 size-4" />
          ) : (
            <UploadIcon className="size-4 mr-2" />
          )}
          {isPending ? "Uploading..." : "Upload"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="ml-auto hidden h-8 lg:flex"
          aria-label="Donwload"
          onClick={onDonwloadClick}
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
          onClick={() => {
            isAdmin
              ? setShowDeleteDialog(true)
              : setIsPermissionDialogOpen(true);
          }}
          disabled={!table.getIsSomeRowsSelected()}
        >
          <Cross2Icon className="size-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
};
