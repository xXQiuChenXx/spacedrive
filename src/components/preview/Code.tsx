"use client";

import { ItemsResponse, OriResponse } from "@/lib/driveRequest";
import { getLanguageByFileName } from "@/lib/getPreviewType";
import { useTheme } from "next-themes";
import { useMemo } from "react";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  tomorrowNightEighties,
  tomorrow,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import PreviewContainer from "./PreviewContainer";

export const CodePreview = ({
  content,
  file,
}: {
  content: string;
  file: OriResponse | ItemsResponse;
}) => {
  const codeString = useMemo(() => content, [content]);
  const { theme } = useTheme();

  return (
    <PreviewContainer file={file}>
      <SyntaxHighlighter
        language={getLanguageByFileName(file.name)}
        style={theme === "dark" ? tomorrowNightEighties : tomorrow}
        customStyle={{ backgroundColor: "#282c34" }}
      >
        {codeString}
      </SyntaxHighlighter>
    </PreviewContainer>
  );
};
