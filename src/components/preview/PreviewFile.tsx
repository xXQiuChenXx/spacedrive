import { getFileContent, OriResponse } from "@/lib/driveRequest";
import { getFileExtension } from "@/lib/icon/getFileType";
import { getPreviewType, preview } from "@/lib/icon/getPreviewType";
import { MarkdownPreview } from "./Markdown";
import { ImagePreview } from "./Image";
import { CodePreview } from "./Code";
import TextPreview from "./Text";
import { PDFPreview } from "./pdf";
import { OfficePreview } from "./Office";
import { VideoPreview } from "./VideoPreview";
import { AudioPreview } from "./AudioPreview";
import { apiConfig } from "@/config/api.config";

const PreviewFile = async ({ file }: { file: OriResponse }) => {
  const previewType = getPreviewType(getFileExtension(file.name), {
    video: Boolean(file.video),
  });

  if (previewType) {
    switch (previewType) {
      case preview.image:
        return <ImagePreview file={file} origin={apiConfig.origin} />;

      case preview.text:
        return <TextPreview file={file} content={await getFileContent(file)} />;

      case preview.code:
        return <CodePreview file={file} content={await getFileContent(file)} />;

      case preview.markdown:
        return (
          <MarkdownPreview file={file} content={await getFileContent(file)} />
        );

      case preview.video:
        return <VideoPreview file={file} origin={apiConfig.origin} />;

      case preview.audio:
        return <AudioPreview file={file} origin={apiConfig.origin} />;

      case preview.pdf:
        return <PDFPreview file={file} origin={apiConfig.origin} />;

      case preview.office:
        return <OfficePreview file={file} origin={apiConfig.origin} />;
    }
  }
  return null;
};

export default PreviewFile;
