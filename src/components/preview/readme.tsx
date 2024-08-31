import Markdown from "react-markdown";

const ReadMePreview = ({ content }: { content: string }) => {
  return (
    <div className="w-11/12 mx-auto border p-10 mt-16">
      <Markdown>{content}</Markdown>
    </div>
  );
};

export default ReadMePreview;
