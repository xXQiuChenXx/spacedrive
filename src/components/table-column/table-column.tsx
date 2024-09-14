"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ItemsResponse } from "@/lib/driveRequest";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { formatBytes } from "@/lib/utils";
import { FolderIcon, FileTextIcon } from "lucide-react";
import DeleteDialog from "../action-dialog/DeleteDialog";
import RenameDialog from "../action-dialog/RenameDialog";
import { downloadSingleFile } from "@/lib/downloadHandler";
import FormatDate from "./format-date";
import { useState } from "react";
import { toast } from "sonner";

export function getColumns(
  isDesktop: boolean,
  pathname: string,
  isAdmin: boolean
): ColumnDef<ItemsResponse>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <div className="xl:min-w-5">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-0.5"
          />
        </div>
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onClick={(e) => e.stopPropagation()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "file",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="File Name"
          className=" lg:min-w-96 xl:min-w-[30rem]"
        />
      ),
      cell: ({ cell, getValue }) => (
        <div
          className="font-medium flex gap-3 items-center max-w-44 md:max-w-72 lg:max-w-sm xl:max-w-xl"
          data-group="row-data"
        >
          {(getValue() as ItemsResponse["file"])?.isFolder ? (
            <FolderIcon
              className="size-5 flex-shrink-0"
              data-group="row-data"
            />
          ) : (
            <FileTextIcon
              className="size-5 flex-shrink-0"
              data-group="row-data"
            />
          )}
          <p className="w-full truncate" data-group="row-data">
            {(getValue() as ItemsResponse["file"]).name}
          </p>
        </div>
      ),
      filterFn: (row, id, value) => {
        const name = (row.getValue("file") as ItemsResponse)?.name;
        return name.toLowerCase().includes((value as string).toLowerCase());
      },
      sortingFn: (rowA, rowB, columnId) => {
        // 1 when a > b
        const { isFolder: isFolderA, name: nameA } = rowA.original.file;
        const { isFolder: isFolderB, name: nameB } = rowB.original.file;
        if (isFolderA !== isFolderB) {
          return isFolderA ? -1 : 1;
        }
        return nameA.localeCompare(nameB);
      },
      enableHiding: false,
    },
    {
      accessorKey: "size",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="File Size" />
      ),
      meta: {
        show: isDesktop,
      },
      cell: ({ cell }) => formatBytes(cell.getValue() as number),
    },
    {
      accessorKey: "lastModifiedDateTime",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Modified" />
      ),
      cell: ({ cell }) => <FormatDate date={cell.getValue() as string} />,
      meta: {
        show: isDesktop,
      },
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [showDeleteDialog, setShowDeleteDialog] = useState(false);
        const [showRenameDialog, setShowRenameDialog] = useState(false);

        return (
          <>
            <DeleteDialog
              items={[row.original]}
              open={showDeleteDialog}
              onOpenChange={setShowDeleteDialog}
              onSuccess={() => row.toggleSelected(false)}
            />
            <RenameDialog
              item={row.original}
              open={showRenameDialog}
              onOpenChange={setShowRenameDialog}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {isAdmin && (
                  <DropdownMenuItem
                    onSelect={() => setShowRenameDialog(true)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Rename
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}${pathname}/${row.original.name}`
                    );
                    toast.success("Copied link to clipboard");
                  }}
                >
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadSingleFile({ item: row.original });
                  }}
                >
                  Download
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteDialog(true);
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];
}
