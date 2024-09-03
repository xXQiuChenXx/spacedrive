"use client";
import { ChangeEvent, useRef, useState, useTransition } from "react";
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
import DeleteDialog from "@/components/action-dialog/DeleteDialog";
import { toast } from "sonner";
import { uploadFile } from "@/lib/actions/uploadFile";

export const DataTableToolbar = ({
  table,
}: {
  table: Table<ItemsResponse>;
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const pathname = usePathname().replace("home/", "").replace("home", "");
  const [isCreateFolderDialogOpen, setIsCreateFolderDialogOpen] =
    useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  function uploadInputChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target?.files?.[0];
    if (file) {
      startTransition(async () => {
        const formdata = new FormData();
        formdata.append("file", file);
        formdata.append("path", pathname);
        const { error } = await uploadFile({ formdata });
        if (error) {
          toast.error(error);
        } else {
          toast.success(file.name + " uploaded successfully");
        }
      });
    }
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
        <DeleteDialog
          items={
            table
              .getSelectedRowModel()
              .rows.map((row) => row.original) as ItemsResponse[]
          }
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onSuccess={() => table.toggleAllPageRowsSelected(false)} // cancel all selection after deleted
        />
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
          onClick={(e) => setIsCreateFolderDialogOpen(true)}
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
          disabled={isPending}
        >
          <UploadIcon className="size-4 mr-2" />
          Upload
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="ml-auto hidden h-8 lg:flex"
          aria-label="Donwload"
          onClick={(e) =>
            console.log(table.getSelectedRowModel().rows.map((r) => r.original))
          }
          disabled={!table.getIsSomeRowsSelected()}
        >
          <DownloadIcon className="size-4 mr-2" />
          Download
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
          className="ml-auto hidden h-8 lg:flex"
          aria-label="Upload"
          onClick={() => setShowDeleteDialog(true)}
          disabled={!table.getIsSomeRowsSelected()}
        >
          <Cross2Icon className="size-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
};
