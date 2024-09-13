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
      className="overflow-hidden rounded-md border mt-2.5"
    >
      <TableHeader>
        {table.getHeaderGroups().map((group) => (
          <TableRow key={group.id}>
            {group.headers.map((header) => (
              <TableHead key={header.id} colSpan={header.colSpan}>
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
            <TableRow
              key={`item-${i + 1}`}
              className="cursor-pointer"
              data-state={row.getIsSelected() && "selected"}
              onContextMenu={(event) => {
                event.preventDefault(); // todo
              }}
              onClick={(event) => {
                if (
                  (event.target as HTMLElement).getAttribute("data-group") ===
                  "row-data"
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
                    if (cell.column.id === "select") {
                      cell.row.toggleSelected();
                    }
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
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
