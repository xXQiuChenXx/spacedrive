import Link from "next/link";
import {
  AnchorHTMLAttributes,
  Component,
  CSSProperties,
  HTMLAttributes,
} from "react";
import { CodeBlock } from "./CodeBlock";

function MDXLink({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) return <a {...props} />;

  const isExternal = href.startsWith("https://") || href.startsWith("http://");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" {...props} />
    );
  }

  return <Link href={href} {...props} />;
}

const headingTypes = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

function Heading({
  as: As,
  ...props
}: { as: (typeof headingTypes)[number] } & HTMLAttributes<HTMLHeadingElement>) {
  if (props.id)
    return (
      <a href={`#${props.id}`} className="no-underline group">
        <As {...props}>
          <span className="absolute -ml-4 mt-0.5 dark:text-neutral-500 text-base opacity-0 transition-opacity group-hover:opacity-100">
            #
          </span>
          {props.children}
        </As>
      </a>
    );

  return <As {...props}>{props.children}</As>;
}

export const customRenderer: Partial<Component> = {
  img: ({
    alt,
    src,
    title,
    width,
    height,
    style,
  }: {
    alt?: string;
    src?: string;
    title?: string;
    width?: string | number;
    height?: string | number;
    style?: CSSProperties;
  }) => {
    return (
      <img
        alt={alt}
        src={src}
        title={title}
        width={width}
        height={height}
        style={style}
      />
    );
  },
  a: MDXLink,
  ...Object.fromEntries(
    headingTypes.map((type) => [
      type,
      (props: HTMLAttributes<HTMLHeadingElement>) => (
        <Heading as={type} {...props} />
      ),
    ])
  ),
  pre: CodeBlock,
  h2: ({ ...props }) => (
    <Heading as={"h2"} className={"border-b pb-2"} {...props} />
  ),
  span: ({ ...props }) => (
    <span className={"text-sm"} {...props}>
      {props.children}
    </span>
  ),
  code: ({ ...props }) => (
    <code
      className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
      {...props}
    >
      {props.children}
    </code>
  ),
};
