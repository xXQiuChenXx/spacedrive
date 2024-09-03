"use client";
import { ChangeEvent, useRef, useState } from "react";
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
import { deleteFiles } from "@/lib/deleteHandler";
import { ItemsResponse } from "@/lib/driveRequest";
import DeleteDialog from "@/components/action-dialog/DeleteDialog";

export const DataTableToolbar = ({ table }: { table: Table<unknown> }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const pathname = usePathname().replace("home/", "").replace("home", "");
  const [isCreateFolderDialogOpen, setIsCreateFolderDialogOpen] =
    useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function uploadInputChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target?.files?.[0];
    if (file) {
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("path", pathname);
      await fetch(window.location.origin + "/api/graph/create/file", {
        method: "POST",
        body: formdata,
      }).then(async (res) => console.log(await res.json()));
    }
  }

  return (
    <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter File Name..."
          value={(table.getColumn("file")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("file")?.setFilterValue(event.target.value)
          }
          className="h-8 w-40 lg:w-64"
        />
      </div>
      <div className="flex items-center gap-2">
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
          className="ml-auto hidden h-8 lg:flex"
          aria-label="Donwload"
          onClick={(e) => setIsCreateFolderDialogOpen(true)}
        >
          <PlusIcon className="size-4 mr-2" />
          Create Folder
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="ml-auto hidden h-8 lg:flex"
          aria-label="Donwload"
          onClick={(e) =>
            console.log(table.getSelectedRowModel().rows.map((r) => r.original))
          }
        >
          <DownloadIcon className="size-4 mr-2" />
          Download
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="ml-auto hidden h-8 lg:flex"
          aria-label="Upload"
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadIcon className="size-4 mr-2" />
          Upload
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
        >
          <Cross2Icon className="size-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
};
