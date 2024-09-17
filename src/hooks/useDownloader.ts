import { downloadFileInBrowser } from "@/lib/downloadHandler";
import { ItemsResponse } from "@/lib/driveRequest";
import { downloadMultiFiles } from "@/lib/MultiFileDownloader";
import { useTransition } from "react";

export function useDownloader({
  selectedItems,
  folderName,
}: {
  folderName: string;
  selectedItems: ItemsResponse[];
}) {
  const [isDownloading, startDownload] = useTransition();
  const filteredItems = selectedItems.filter((item) => !item.file.isFolder); //only can download files
  function onDownloadClick() {
    startDownload(async () => {
      if (filteredItems.length > 1) {
        await downloadMultiFiles({ items: filteredItems, folderName }).catch(
          (err) => console.log(err)
        );
      } else {
        const { id, name } = selectedItems[0];
        const params = new URLSearchParams({
          id: id,
          name: name,
        });
        const url = `/api/graph/download?${params.toString()}`;
        await downloadFileInBrowser({ name, url });
      }
    });
  }

  return { isDownloading, onDownloadClick };
}
