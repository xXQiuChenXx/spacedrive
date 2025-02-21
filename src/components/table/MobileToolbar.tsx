import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { ItemsResponse } from "@/lib/driveRequest";
import { DownloadIcon, LoaderIcon } from "lucide-react";

const MobileToolbar = ({
  selectedItems,
  setDeleteDialogOpen,
  isDownloading,
  onDownloadClick,
  isAdmin,
}: {
  selectedItems: ItemsResponse[];
  setDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  isDownloading: boolean;
  isAdmin: boolean;
  onDownloadClick: () => void;
}) => {
  return (
    Boolean(selectedItems.length) && (
      <div className="fixed bottom-0 left-0 mb-6 z-50 w-full">
        <div className="bg-gray-900 flex justify-center w-fit mx-auto gap-5 border p-3 shodow-lg rounded">
          <Button
            variant="destructive"
            disabled={!isAdmin}
            onClick={() => setDeleteDialogOpen(true)}
          >
            Delete
          </Button>
          <Button
            variant="outline"
            aria-label="Donwload"
            onClick={onDownloadClick}
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
    )
  );
};

export default MobileToolbar;
