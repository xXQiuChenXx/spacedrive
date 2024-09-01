import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { BookOpenText } from "lucide-react";

const ReadMePreview = ({ content }: { content: string }) => {
  return (
    <div className="w-11/12 mx-auto border p-10 mt-16 prose dark:prose-invert max-w-none rounded-lg shadow">
      <p className="font-bold text-base text-black dark:text-white">
        <BookOpenText className="size-6 inline-block mr-4" />
        README.md
      </p>
      <hr className="mt-0 mb-5" />
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
      >
        {content}
      </Markdown>
    </div>
  );
};

export default ReadMePreview;