import { DataTableSkeleton } from "@/components/DataSkeleton";

export default function Loading() {
  return (
    <DataTableSkeleton
      columnCount={4}
      cellWidths={["10rem", "40rem", "12rem", "8rem"]}
      shrinkZero
    />
  );
}
