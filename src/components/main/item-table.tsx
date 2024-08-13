"use client";

import * as React from "react";
import { type DataTableFilterField } from "@/types";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import { getColumns } from "./tasks-table-columns";
import { useTasksTable } from "./tasks-table-provider";
import { TasksTableToolbarActions } from "./tasks-table-toolbar-actions";
import { Item } from "@/lib/requests";
import { filterItems } from "@/lib/requests";

export function ItemsTable({
  itemsPromise,
}: {
  itemsPromise: Promise<{ data: Item[]; pageCount: number }>;
}) {
  // Feature flags for showcasing some additional features. Feel free to remove them.
  const { featureFlags } = useTasksTable();

  const { data, pageCount } = React.use(itemsPromise);

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), []);

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<Item>[] = [
    {
      label: "Name",
      value: "name",
      placeholder: "Filter name...",
    },
  ];

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    /* optional props */
    filterFields,
    enableAdvancedFilter: featureFlags.includes("advancedFilter"),
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    // For remembering the previous row selection on page change
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
    /* */
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields}>
        <TasksTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
