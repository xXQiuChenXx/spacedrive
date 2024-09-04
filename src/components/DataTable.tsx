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
import { ReactNode, useMemo } from "react";
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
import { useMediaQuery } from "@/app/hooks/use-media-query";

const DataTable = ({
  data,
  children,
}: {
  data: ItemsResponse[];
  children: ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 860px)");

  // Memoize the columns
  const columns = useMemo(() => getColumns(isDesktop), [isDesktop]);
  const { table } = useDataTable({ columns, data });

  return (
    <div className="w-full md:w-11/12 mx-auto overflow-auto">
      <DataTableToolbar table={table} />
      <div className="overflow-hidden rounded-md border mt-2.5">
        <Table>
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
                        if (cell.column.id === "select") {
                          cell.row.toggleSelected();
                        }
                      }}
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
      <div className="mt-10">{children}</div>
    </div>
  );
};

export default DataTable;
