"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { ItemsResponse } from "@/lib/driveRequest";
import { flexRender, Table as TanstackTable } from "@tanstack/react-table";
import DragBox from "../DragBox";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export const DataTable = ({
  table,
  uploadFile,
  isUploading,
}: {
  table: TanstackTable<ItemsResponse>;
  uploadFile: ({ files }: { files: File[] }) => void;
  isUploading: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { handleDragLeave, handleDragOver, handleDrop, dragState } =
    useDragAndDrop({
      uploadFile,
    });

  return (
    <Table
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      <TableHeader>
        {table.getHeaderGroups().map((group) => (
          <TableRow key={group.id}>
            {group.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length && !dragState ? (
          table.getRowModel().rows.map((row, i) => (
            <ContextMenu key={row.id}>
              <ContextMenuTrigger asChild>
                <TableRow
                  key={`item-${i + 1}`}
                  className="cursor-pointer"
                  data-state={row.getIsSelected() && "selected"}
                  onClick={(event) => {
                    if (
                      (event.target as HTMLElement).getAttribute(
                        "data-group"
                      ) === "row-data"
                    ) {
                      const filename = (row.getValue("file") as any)?.name;
                      router.push(`${pathname}/${filename}`);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      data-group={
                        cell.column.id !== "select" ? "row-data" : undefined
                      }
                      onClick={() => {
                        if (cell.column.id === "select")
                          cell.row.toggleSelected();
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onClick={() => {}}>Rename</ContextMenuItem>
                <ContextMenuItem>Share</ContextMenuItem>
                <ContextMenuItem>Download</ContextMenuItem>
                <ContextMenuItem>Delete</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))
        ) : (
          <TableRow>
            {dragState ? (
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center"
              >
                <DragBox isUploading={isUploading} />
              </TableCell>
            ) : (
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
