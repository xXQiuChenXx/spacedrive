"use client";
import { ReactNode, useMemo, useState } from "react";
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
import { DataTable } from "./DataTable";
import { useUploader } from "@/hooks/useUploader";

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
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const pathSegment = pathname.split("/");
  const cleanPath = `/${pathSegment.slice(2, pathSegment.length).join("/")}`;
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
  const { isUploading, uploadFile } = useUploader({
    isAdmin,
    path: cleanPath,
  });

  return (
    <div className="w-full md:w-11/12 mx-auto overflow-auto">
    
      <DeleteDialog
        items={selectedItems}
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onSuccess={() => table.toggleAllPageRowsSelected(false)} // cancel all selection after deleted
      />
      <DataTableToolbar
        table={table}
        setShowDeleteDialog={setDeleteDialogOpen}
        isAdmin={isAdmin}
        uploadFile={uploadFile}
        onDownloadClick={onDownloadClick}
        isDownloading={isDownloading}
        isUploading={isUploading}
      />
      <div className="overflow-hidden rounded-md border mt-2.5">
        <DataTable
          table={table}
          uploadFile={uploadFile}
          isUploading={isUploading}
        />
      </div>
      <TableFooter table={table} />
      <div className="mt-10">{children}</div>
      {!isDesktop && (
        <MobileToolbar
          isAdmin={isAdmin}
          selectedItems={selectedItems}
          setDeleteDialogOpen={setDeleteDialogOpen}
          isDownloading={isDownloading}
          onDownloadClick={onDownloadClick}
        />
      )}
    </div>
  );
};
