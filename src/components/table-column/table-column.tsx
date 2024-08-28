import React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { ItemsResponse } from "@/lib/driveRequest";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

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
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[31.25rem]  truncate font-medium">
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "fileSize",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="File Size" />
      ),
      // Todo
      cell: ({ cell }) => cell.getValue(),
    },
    {
      accessorKey: "lastModified",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Modified" />
      ),
      cell: ({ cell }) => cell.getValue(),
      // Todo cell: ({ cell }) => formatDate(cell.getValue() as Date),
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
        const [showLockDialog, setShowLockDialog] = React.useState(false);
        const [shoShareDialog, setShowShareDialog] = React.useState(false);
        const [showRenameDialog, setShowRenameDialog] = React.useState(false);

        return (
          <>
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
                <DropdownMenuItem onSelect={() => setShowRenameDialog(true)}>
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setShowShareDialog(true)}>
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setShowLockDialog(true)}>
                  Lock
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}>
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
