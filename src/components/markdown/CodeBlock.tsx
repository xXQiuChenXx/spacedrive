"use client";

import { useState, useRef } from "react";
import { Clipboard, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CodeBlock({
  children,
  style: _style,
  ...props
}: React.HTMLProps<HTMLPreElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  return (
    <pre
      className="flex items-center font-mono p-2 dark:bg-neutral-900 border dark:border-neutral-800 rounded-lg overflow-auto"
      {...props}
    >
      <ScrollArea
        // orientation="horizontal"
        className="flex-1"
        // scrollBarClassName="h-2"
        ref={ref}
      >
        {children}
      </ScrollArea>
      <Button
        variant="ghost"
        size="icon"
        className="size-6 hover:bg-zinc-400 hover:text-zinc-900 dark:hover:bg-zinc-700 dark:hover:text-zinc-50"
        onClick={() => {
          if (typeof window === "undefined") return;
          setIsCopied(true);
          void window.navigator.clipboard.writeText(
            ref.current?.innerText ?? ""
          );
          setTimeout(() => setIsCopied(false), 2000);
        }}
      >
        {isCopied ? (
          <Check className="size-3" aria-hidden="true" />
        ) : (
          <Clipboard className="size-3" aria-hidden="true" />
        )}
        <span className="sr-only">
          {isCopied ? "Copied" : "Copy to clipboard"}
        </span>
      </Button>
    </pre>
  );
}
