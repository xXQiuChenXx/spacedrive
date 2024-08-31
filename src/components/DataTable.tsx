"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter, usePathname } from "next/navigation";
import { ItemsResponse } from "@/lib/driveRequest";
import { useMemo, useState } from "react";
import { getColumns } from "./table-column/table-column";
import { flexRender } from "@tanstack/react-table";
import { useDataTable } from "@/app/hooks/useDataTable";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { DataTableToolbar } from "./DataToolbar";

const DataTable = ({ data }: { data: ItemsResponse[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  // Memoize the columns
  const columns = useMemo(() => getColumns(), []);
  const { table } = useDataTable({ columns, data });

  return (
    <div className="w-full md:w-11/12 mx-auto space-y-2.5 overflow-auto">
      <DataTableToolbar table={table} />
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.column.getSize() }}
                  >
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer"
                  data-state={row.getIsSelected() && "selected"}
                  onContextMenu={(event) => {
                    event.preventDefault();
                  }}
                  onClick={(event) => {
                    console.log("click")
                    if (
                      (event.target as HTMLElement).getAttribute(
                        "data-group"
                      ) === "row-data"
                    ) {
                      console.log("click-click")
                      const filename = (row.getValue("file") as any)?.name;
                      router.push(`${pathname}/${filename}`);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      data-group="row-data"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
