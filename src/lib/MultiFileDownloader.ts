import { toast } from "sonner";
import { ItemsResponse, OriResponse } from "./driveRequest";
import JSZip from "jszip";

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
      fetch(`${window.location.origin}/api/graph/raw?item=${id}`).then((r) => {
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
  downloadBlob({
    blob: b,
    name: folderName ? folderName + ".zip" : "download.zip",
  });
}

export function downloadBlob({ blob, name }: { blob: Blob; name: string }) {
  // Prepare for download
  const el = document.createElement("a");
  el.style.display = "none";
  document.body.appendChild(el);

  // Download zip file
  const bUrl = window.URL.createObjectURL(blob);
  el.href = bUrl;
  el.download = name;
  el.click();
  window.URL.revokeObjectURL(bUrl);
  el.remove();
}
