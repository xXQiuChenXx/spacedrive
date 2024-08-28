import {
  getCoreRowModel,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";

interface Props {
    columns: any;
    data: any;
}

export function useDataTable<TData>({ columns, data }: Props) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return { table };
}
