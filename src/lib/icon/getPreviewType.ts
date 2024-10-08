import { getFileExtension } from "@/lib/icon/getFileType";

export const preview = {
  markdown: "markdown",
  image: "image",
  text: "text",
  pdf: "pdf",
  code: "code",
  video: "video",
  audio: "audio",
  office: "ms-office",
  url: "url",
};

export type previewType = keyof typeof preview;

export const extensions: { [key: string]: string } = {
  gif: preview.image,
  jpeg: preview.image,
  jpg: preview.image,
  png: preview.image,
  webp: preview.image,

  md: preview.markdown,
  markdown: preview.markdown,
  mdown: preview.markdown,

  pdf: preview.pdf,

  doc: preview.office,
  docx: preview.office,
  ppt: preview.office,
  pptx: preview.office,
  xls: preview.office,
  xlsx: preview.office,

  c: preview.code,
  cpp: preview.code,
  h: preview.code,
  hpp: preview.code,
  js: preview.code,
  jsx: preview.code,
  java: preview.code,
  sh: preview.code,
  cs: preview.code,
  py: preview.code,
  css: preview.code,
  html: preview.code,
  ts: preview.code,
  tsx: preview.code,
  rs: preview.code,
  vue: preview.code,
  json: preview.code,
  yml: preview.code,
  yaml: preview.code,
  toml: preview.code,

  txt: preview.text,
  vtt: preview.text,
  srt: preview.text,
  log: preview.text,
  diff: preview.text,

  mp4: preview.video,
  flv: preview.video,
  webm: preview.video,
  m3u8: preview.video,
  mkv: preview.video,
  mov: preview.video,
  avi: preview.video, // won't work!

  mp3: preview.audio,
  m4a: preview.audio,
  aac: preview.audio,
  wav: preview.audio,
  ogg: preview.audio,
  oga: preview.audio,
  opus: preview.audio,
  flac: preview.audio,
};

export function getPreviewType(
  extension: string,
  flags?: { video?: boolean }
): string | undefined {
  let previewType = extensions[extension];
  if (!previewType) {
    return previewType;
  }

  // Files with '.ts' extensions may be TypeScript files or TS Video files, we check for the flag 'video'
  // to determine what preview renderer to use for '.ts' files.
  if (extension === "ts") {
    if (flags?.video) {
      previewType = preview.video;
    }
  }

  return previewType;
}

export function getLanguageByFileName(filename: string): string {
  const extension = getFileExtension(filename);
  switch (extension) {
    case "h":
      return "c";
    case "hpp":
      return "cpp";
    case "ts":
    case "tsx":
      return "typescript";
    case "rs":
      return "rust";
    case "js":
    case "jsx":
      return "javascript";
    case "sh":
      return "shell";
    case "cs":
      return "csharp";
    case "py":
      return "python";
    case "yml":
      return "yaml";
    default:
      return extension;
  }
}
