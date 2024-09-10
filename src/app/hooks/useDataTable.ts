import { ItemsResponse } from "@/lib/driveRequest";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";

interface UseDataTableProps<TData>
  extends Omit<TableOptions<TData>, "data" | "columns" | "getCoreRowModel"> {
  data: ItemsResponse[];
  columns: ColumnDef<ItemsResponse>[];
}

export function useDataTable<TData>({
  columns,
  data,
}: UseDataTableProps<TData>) {
  const table = useReactTable({
    columns: columns.filter((col: any) => col?.meta?.show ?? true),
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return { table };
}
