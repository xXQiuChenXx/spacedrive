import { DownloadIcon, Loader } from "lucide-react";
import React from "react";

const DragBox = ({ isUploading }: { isUploading: boolean }) => {
  return (
    <div className="border-dashed border-2 border-blue-400 rounded-md w-full flex flex-col items-center justify-center py-10 gap-4 h-[50vh] bg-gray-600 opacity-60">
      {isUploading ? (
        <Loader className="animate-spin size-20" />
      ) : (
        <DownloadIcon className="size-20" />
      )}
      <p className="font-semibold text-base">Drag and drop files here </p>
    </div>
  );
};

export default DragBox;
