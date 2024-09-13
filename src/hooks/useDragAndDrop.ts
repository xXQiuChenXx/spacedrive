import { DragEventHandler, useState } from "react";

export function useDragAndDrop({
  uploadFile,
}: {
  uploadFile: ({ files }: { files: File[] }) => void;
}) {
  const [dragState, setDragState] = useState<boolean>(false);

  const handleDragOver: DragEventHandler<HTMLTableElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dragState) setDragState(true);
  };

  const handleDrop: DragEventHandler<HTMLTableElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!e?.dataTransfer) return;
    const droppedFiles = Array.from(e.dataTransfer.files) as File[]; // Get the files from the drop event
    const filteredFiles = droppedFiles.filter((file) => file.type);
    if (!droppedFiles.length) return;
    await uploadFile({ files: filteredFiles });
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

  return { handleDrop, handleDragOver, handleDragLeave, dragState };
}
