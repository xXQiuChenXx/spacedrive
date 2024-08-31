import React from "react";
import { Input } from "@/components/ui/input";
import { type Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { UploadIcon, DownloadIcon, PlusIcon } from "@radix-ui/react-icons";

export const DataTableToolbar = ({ table }: { table: Table<unknown> }) => {
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
        <Button
          size="sm"
          variant="outline"
          className="ml-auto hidden h-8 lg:flex"
          aria-label="Donwload"
        >
          <PlusIcon className="size-4 mr-2" />
          Create Folder
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="ml-auto hidden h-8 lg:flex"
          aria-label="Donwload"
        >
          <DownloadIcon className="size-4 mr-2" />
          Download
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="ml-auto hidden h-8 lg:flex"
          aria-label="Upload"
        >
          <UploadIcon className="size-4 mr-2" />
          Upload
        </Button>
      </div>
    </div>
  );
};
