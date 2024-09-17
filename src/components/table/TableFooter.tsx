import { ItemsResponse } from "@/lib/driveRequest";
import { Table } from "@tanstack/react-table";
import React from "react";

const TableFooter = ({ table }: { table: Table<ItemsResponse> }) => {
  return (
    <p className="text-muted-foreground p-2">
      {table.getFilteredSelectedRowModel().rows.length} of{" "}
      {table.getFilteredRowModel().rows.length} row(s) selected.
    </p>
  );
};

export default TableFooter;
