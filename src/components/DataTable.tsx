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
import {
  DragEventHandler,
  ReactNode,
  useMemo,
  useState,
  useTransition,
} from "react";
import { getColumns } from "./table-column/table-column";
import { flexRender } from "@tanstack/react-table";
import { useDataTable } from "@/hooks/useDataTable";
import { DataTableToolbar } from "./DataToolbar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "./ui/button";
import DeleteDialog from "./action-dialog/DeleteDialog";
import { downloadMultiFiles } from "@/lib/MultiFileDownloader";
import { DownloadIcon, LoaderIcon } from "lucide-react";
import { getCachedToken, refreshItems } from "@/lib/fns";
import { uploadFile } from "@/lib/actions/uploadFile";
import DragBox from "./DragBox";
import { PermissionDialog } from "./action-dialog/PermissionDialog";

const DataTable = ({
  data,
  children,
  isAdmin,
}: {
  data: ItemsResponse[];
  children: ReactNode;
  isAdmin: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 860px)");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDownloading, startDownloadTransition] = useTransition();
  const folderName = pathname.replace(/^home\/?|\/home\/?$/, "");
  const [dragState, setDragState] = useState<boolean>(false);
  const [isUploading, startUploading] = useTransition();
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);

  // Memoize the columns
  const columns = useMemo(
    () => getColumns(isDesktop, pathname, isAdmin),
    [isDesktop, pathname, isAdmin]
  );
  const { table } = useDataTable({ columns, data });
  function onDonwloadClick() {
    startDownloadTransition(async () => {
      const items = table
        .getSelectedRowModel()
        .rows.map((r) => r.original)
        .filter((item) => !item.file.isFolder);
      await downloadMultiFiles({ items, folderName }).catch((err) =>
        console.log(err)
      );
    });
  }

  const handleDragOver: DragEventHandler<HTMLTableElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dragState) setDragState(true);
  };

  const handleDrop: DragEventHandler<HTMLTableElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!e?.dataTransfer) return;
    const droppedFiles = Array.from(e.dataTransfer.files) as File[]; // Get the files from the drop event'
    if (!droppedFiles.length) return;

    const token = await getCachedToken();
    if (token) {
      startUploading(async () => {
        for (const file of droppedFiles) {
          if (!file.type) continue; // filter folder
          const accessToken = token.accessToken;
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
    <div className="w-full md:w-11/12 mx-auto overflow-auto">
      <PermissionDialog
        onSuccess={() => router.refresh()}
        open={isPermissionDialogOpen}
        onOpenChange={setIsPermissionDialogOpen}
      />
      <DataTableToolbar
        table={table}
        setShowDeleteDialog={setShowDeleteDialog}
        setIsPermissionDialogOpen={setIsPermissionDialogOpen}
        isAdmin={isAdmin}
      />
      <div className="overflow-hidden rounded-md border mt-2.5">
        <Table
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
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
      </div>
      <p className="text-muted-foreground p-2">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </p>
      {Boolean(table.getFilteredSelectedRowModel().rows.length) &&
        !isDesktop && (
          <div className="fixed bottom-0 left-0 mb-6 z-50 w-full">
            <div className="bg-gray-900 flex justify-center w-fit mx-auto gap-5 border p-3 shodow-lg rounded">
              <Button
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                Delete
              </Button>
              <Button
                variant="outline"
                aria-label="Donwload"
                onClick={onDonwloadClick}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <LoaderIcon className="animate-spin mr-2 size-4" />
                ) : (
                  <DownloadIcon className="size-4 mr-2" />
                )}
                {isDownloading ? "Downloading" : "Download"}
              </Button>
            </div>
          </div>
        )}
      <DeleteDialog
        items={
          table
            .getSelectedRowModel()
            .rows.map((row) => row.original) as ItemsResponse[]
        }
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onSuccess={() => table.toggleAllPageRowsSelected(false)} // cancel all selection after deleted
      />
      <div className="mt-10">{children}</div>
    </div>
  );
};

export default DataTable;
