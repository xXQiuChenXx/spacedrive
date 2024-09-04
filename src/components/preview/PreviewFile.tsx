import { getFileContent, OriResponse } from "@/lib/driveRequest";
import { getFileExtension } from "@/lib/getFileIcon";
import { getPreviewType, preview } from "@/lib/getPreviewType";
import { MarkdownPreview } from "./Markdown";
import ImagePreview from "./Image";

const PreviewFile = async ({ file }: { file: OriResponse }) => {
  const previewType = getPreviewType(getFileExtension(file.name), {
    video: Boolean(file.video),
  });
  if (previewType) {
    let content;
    if (previewType !== preview.image) content = await getFileContent(file);
    switch (previewType) {
      case preview.image:
        return <ImagePreview file={file} />;

      //   case preview.text:
      //     return <TextPreview file={file} content={content} />;

      //   case preview.code:
      //     return <CodePreview file={file} content={content} />;

      case preview.markdown:
        return (
          <MarkdownPreview file={file} content={content as string} />
        );

      //   case preview.video:
      //     return <VideoPreview file={file} content={content} />;

      //   case preview.audio:
      //     return <AudioPreview file={file} content={content} />;

      //   case preview.pdf:
      //     return <PDFPreview file={file} content={content} />;

      //   case preview.office:
      //     return <OfficePreview file={file} content={content} />;
    }
  }
  return null;
};

export default PreviewFile;
