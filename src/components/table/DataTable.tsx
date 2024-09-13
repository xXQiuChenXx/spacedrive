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
import { DragEventHandler, useState, useTransition } from "react";
import { flexRender, Table as TanstackTable } from "@tanstack/react-table";
import { getCachedToken, refreshItems } from "@/lib/fns";
import { uploadFile } from "@/lib/actions/uploadFile";
import DragBox from "../DragBox";

const DataTable = ({ table }: { table: TanstackTable<ItemsResponse> }) => {
  const router = useRouter();
  const pathname = usePathname();
  const folderName = pathname.replace(/^home\/?|\/home\/?$/, "");
  const [dragState, setDragState] = useState<boolean>(false);
  const [isUploading, startUploading] = useTransition();

  const handleDragOver: DragEventHandler<HTMLTableElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dragState) setDragState(true);
  };

  const handleDrop: DragEventHandler<HTMLTableElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!e?.dataTransfer) return;
    const droppedFiles = Array.from(e.dataTransfer.files) as File[]; // Get the files from the drop event
    const filteredFiles = droppedFiles.filter((file) => file.type);
    if (!droppedFiles.length) return;

    const accessToken = await getCachedToken();
    if (accessToken) {
      startUploading(async () => {
        for (const file of filteredFiles) {
          const formdata = new FormData();
          formdata.append("file", file);
          formdata.append("path", folderName);
          await uploadFile({ formdata, accessToken });
        }
        await refreshItems();
        setDragState(false);
      });
    } else {
      setDragState(false);
    }
  };

  const handleDragLeave: DragEventHandler<HTMLTableElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!event?.currentTarget) return;

    // Reset dragging state when leaving the drop zone
    const rect = (
      event?.currentTarget as HTMLTableElement
    ).getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      if (dragState) setDragState(false);
    }
  };

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
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="cursor-pointer"
              data-state={row.getIsSelected() && "selected"}
              onContextMenu={(event) => {
                event.preventDefault();
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

export default DataTable;
