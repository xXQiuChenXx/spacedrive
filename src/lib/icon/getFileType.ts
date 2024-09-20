import { fileIconsTheme } from "@/components/icons/fileIconsTheme";

export const extensions = {
  gif: fileIconsTheme.image,
  jpeg: fileIconsTheme.image,
  jpg: fileIconsTheme.image,
  png: fileIconsTheme.image,
  heic: fileIconsTheme.image,
  webp: fileIconsTheme.image,

  pdf: fileIconsTheme.pdf,

  doc: fileIconsTheme.word,
  docx: fileIconsTheme.word,

  ppt: fileIconsTheme.powerpoint,
  pptx: fileIconsTheme.powerpoint,

  xls: fileIconsTheme.excel,
  xlsx: fileIconsTheme.excel,

  aac: fileIconsTheme.audio,
  mp3: fileIconsTheme.audio,
  ogg: fileIconsTheme.audio,
  flac: fileIconsTheme.audio,
  oga: fileIconsTheme.audio,
  opus: fileIconsTheme.audio,
  m4a: fileIconsTheme.audio,

  avi: fileIconsTheme.video,
  flv: fileIconsTheme.video,
  mkv: fileIconsTheme.video,
  mp4: fileIconsTheme.video,

  "7z": fileIconsTheme.archive,
  bz2: fileIconsTheme.archive,
  xz: fileIconsTheme.archive,
  wim: fileIconsTheme.archive,
  gz: fileIconsTheme.archive,
  rar: fileIconsTheme.archive,
  tar: fileIconsTheme.archive,
  zip: fileIconsTheme.archive,

  c: fileIconsTheme.code,
  cpp: fileIconsTheme.code,
  h: fileIconsTheme.code,
  hpp: fileIconsTheme.code,
  js: fileIconsTheme.code,
  jsx: fileIconsTheme.code,
  java: fileIconsTheme.code,
  sh: fileIconsTheme.code,
  cs: fileIconsTheme.code,
  py: fileIconsTheme.code,
  css: fileIconsTheme.code,
  html: fileIconsTheme.code,
  ts: fileIconsTheme.code,
  tsx: fileIconsTheme.code,
  rs: fileIconsTheme.code,
  vue: fileIconsTheme.code,
  json: fileIconsTheme.code,
  yml: fileIconsTheme.code,
  yaml: fileIconsTheme.code,
  toml: fileIconsTheme.code,

  txt: fileIconsTheme.text,
  rtf: fileIconsTheme.text,
  vtt: fileIconsTheme.text,
  srt: fileIconsTheme.text,
  log: fileIconsTheme.text,
  diff: fileIconsTheme.text,  

  md: fileIconsTheme.markdown,

  epub: fileIconsTheme.book,
  mobi: fileIconsTheme.book,
  azw3: fileIconsTheme.book,

  url: fileIconsTheme.link,
};

export type supportedType = keyof typeof extensions;

// get file extension from file name string
export const getFileExtension = (fileName: string): supportedType => {
  return fileName
    .toLowerCase()
    .slice(fileName.lastIndexOf(".") + 1) as supportedType;
};


