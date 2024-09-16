import { getFileContent, OriResponse } from "@/lib/driveRequest";
import { getFileExtension } from "@/lib/getFileIcon";
import { getPreviewType, preview } from "@/lib/getPreviewType";
import { MarkdownPreview } from "./Markdown";
import { ImagePreview } from "./Image";
import { CodePreview } from "./Code";
import TextPreview from "./Text";
import { PDFPreview } from "./pdf";
import { OfficePreview } from "./Office";
import { VideoPreview } from "./VideoPreview";
import { AudioPreview } from "./AudioPreview";

const PreviewFile = async ({ file }: { file: OriResponse }) => {
  const previewType = getPreviewType(getFileExtension(file.name), {
    video: Boolean(file.video),
  });
  if (previewType) {
    switch (previewType) {
      case preview.image:
        return <ImagePreview file={file} />;

      case preview.text:
        return <TextPreview file={file} content={await getFileContent(file)} />;

      case preview.code:
        return <CodePreview file={file} content={await getFileContent(file)} />;

      case preview.markdown:
        return (
          <MarkdownPreview file={file} content={await getFileContent(file)} />
        );

      case preview.video:
        return <VideoPreview file={file} />;

      case preview.audio:
        return <AudioPreview file={file} />;

      case preview.pdf:
        return <PDFPreview file={file} />;

      case preview.office:
        return <OfficePreview file={file} />;
    }
  }
  return null;
};

export default PreviewFile;
