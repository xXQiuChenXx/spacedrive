"use client";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { BookOpenText } from "lucide-react";
import { useMemo } from "react";
import { ItemsResponse, OriResponse } from "@/lib/driveRequest";
import PreviewContainer from "./PreviewContainer";

export const MarkdownPreview = ({
  content,
  file,
}: {
  content: string;
  file: OriResponse | ItemsResponse;
}) => {
  const mdContent = useMemo(() => content, [content]);
  return (
    <PreviewContainer file={file}>
      <div className="text-sm md:text-base prose dark:prose-invert max-w-none md:p-4">
        <Markdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
        >
          {mdContent}
        </Markdown>
      </div>
    </PreviewContainer>
  );
};
