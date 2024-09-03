import React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";
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
import ShareDialog from "../action-dialog/ShareDialog";
import { handleClick } from "@/lib/downloadHandler";

export function getColumns(): ColumnDef<ItemsResponse>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
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
      size: 40,
    },
    {
      accessorKey: "file",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="File Name" />
      ),
      cell: ({ cell, getValue }) => (
        <div
          className="max-w-[31.25rem] truncate font-medium flex gap-3 items-center"
          data-group="row-data"
        >
          {(getValue() as ItemsResponse["file"])?.isFolder ? (
            <FolderIcon className="size-5" />
          ) : (
            <FileTextIcon className="size-5" />
          )}
          {(getValue() as ItemsResponse["file"]).name}
        </div>
      ),
      filterFn: (row, id, value) => {
        const name = (row.getValue("file") as any)?.name;
        return name.includes(value);
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
      size: 560,
    },
    {
      accessorKey: "size",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="File Size" />
      ),
      size: 100,
      cell: ({ cell }) => formatBytes(cell.getValue() as number),
    },
    {
      accessorKey: "lastModifiedDateTime",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Modified" />
      ),
      cell: ({ cell }) => formatDate(cell.getValue() as string),
      size: 100,
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
        const [showShareDialog, setShowShareDialog] = React.useState(false);
        const [showRenameDialog, setShowRenameDialog] = React.useState(false);

        return (
          <>
            <DeleteDialog
              items={[row.original]}
              open={showDeleteDialog}
              onOpenChange={setShowDeleteDialog}
            />
            <RenameDialog
              item={row.original}
              open={showRenameDialog}
              onOpenChange={setShowRenameDialog}
            />
            <ShareDialog
              item={row.original}
              open={showShareDialog}
              onOpenChange={setShowShareDialog}
            />
            {/* <DeleteTasksDialog
              open={showDeleteDialog}
              onOpenChange={setShowDeleteTaskDialog}
              tasks={[row.original]}
              showTrigger={false}
              onSuccess={() => row.toggleSelected(false)}
            /> */}
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
                <DropdownMenuItem
                  onSelect={() => setShowRenameDialog(true)}
                  onClick={(e) => e.stopPropagation()}
                >
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setShowShareDialog(true)}
                  onClick={(e) => e.stopPropagation()}
                >
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick({ item: row.original });
                  }}
                >
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setShowDeleteDialog(true)}
                  onClick={(e) => e.stopPropagation()}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
      size: 40,
    },
  ];
}
