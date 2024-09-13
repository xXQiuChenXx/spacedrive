"use client";
import { ReactNode, useMemo, useState, useTransition } from "react";
import { PermissionDialog } from "@/components/action-dialog/PermissionDialog";
import { DataTableToolbar } from "@/components/DataToolbar";
import TableFooter from "@/components/table/TableFooter";
import { useDataTable } from "@/hooks/useDataTable";
import { ItemsResponse } from "@/lib/driveRequest";
import { getColumns } from "@/components/table-column/table-column";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import DeleteDialog from "@/components/action-dialog/DeleteDialog";
import MobileToolbar from "./MobileToolbar";
import { useDownloader } from "@/hooks/useDownloader";
import DataTable from "./DataTable";

export const TableShell = ({
  data,
  children,
  isAdmin,
}: {
  data: ItemsResponse[];
  children: ReactNode;
  isAdmin: boolean;
}) => {
  const isDesktop = useMediaQuery("(min-width: 860px)");
  const [isPermDialogOpen, setPermDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  // const [isUploading, startUploading] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const pathSegment = pathname.split("/");
  const columns = useMemo(
    () => getColumns(isDesktop, pathname, isAdmin),
    [isDesktop, pathname, isAdmin]
  );
  const { table } = useDataTable({ columns, data });
  const selectedItems = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);
  const { isDownloading, onDownloadClick } = useDownloader({
    selectedItems,
    folderName: pathSegment[pathSegment.length - 1],
  });

  return (
    <div className="w-full md:w-11/12 mx-auto overflow-auto">
      <PermissionDialog
        onSuccess={() => router.refresh()} // todo: check
        open={isPermDialogOpen}
        onOpenChange={setPermDialogOpen}
      />
      <DeleteDialog
        items={selectedItems}
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onSuccess={() => table.toggleAllPageRowsSelected(false)} // cancel all selection after deleted
      />
      <DataTableToolbar
        table={table}
        setShowDeleteDialog={setDeleteDialogOpen}
        setIsPermissionDialogOpen={setPermDialogOpen}
        isAdmin={isAdmin}
      />
      <DataTable table={table} />
      <div className="mt-10">{children}</div>
      <TableFooter table={table} />
      {!isDesktop && (
        <MobileToolbar
          selectedItems={selectedItems}
          setDeleteDialogOpen={setDeleteDialogOpen}
          isDownloading={isDownloading}
          onDownloadClick={onDownloadClick}
        />
      )}
    </div>
  );
};
