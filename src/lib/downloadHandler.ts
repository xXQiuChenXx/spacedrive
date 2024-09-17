import { toast } from "sonner";
import { ItemsResponse, OriResponse } from "./driveRequest";
import JSZip from "jszip";
import { apiConfig } from "@/config/api.config";

export function downloadSingleFile({
  item,
}: {
  item: { id: string; name: string };
}) {
  const params = new URLSearchParams({
    id: item.id,
    name: item.name,
  });
  const url = `/api/graph/download?${params.toString()}`;
  downloadFileInBrowser({ name: item.name, url });
}

export async function downloadMultiFiles({
  items,
  folderName,
}: {
  items: ItemsResponse[] | OriResponse[];
  folderName: string;
}) {
  const zip = new JSZip();
  const dir = folderName ? zip.folder(folderName)! : zip;
  items.forEach(({ name, id }) => {
    dir.file(
      name,
      fetch(`${apiConfig.origin}/api/graph/raw?item=${id}`).then((r) => {
        return r.blob();
      })
    );
  });
  const b = await zip.generateAsync({ type: "blob" }, (metadata) => {
    toast.loading("Donwloading files " + metadata.percent.toFixed(0) + "%", {
      id: "downloading",
    });
    if (metadata.percent.toFixed(0) === "100") toast.dismiss("downloading");
  });
  downloadFileInBrowser({
    blob: b,
    name: folderName ? folderName + ".zip" : "download.zip",
  });
}

export function downloadFileInBrowser({
  name,
  blob,
  url,
}: {
  blob?: Blob;
  name: string;
  url?: string;
}) {
  const el = document.createElement("a");
  el.style.display = "none";

  const downloadUrl: string =
    url ?? (blob ? window.URL.createObjectURL(blob) : "");

  // Set the href and download attributes
  el.href = downloadUrl;
  el.download = name;

  // Append the anchor to the body, trigger the download, and then remove the anchor
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);

  // Revoke the object URL if a blob was used
  if (blob) {
    window.URL.revokeObjectURL(downloadUrl);
  }
}
