"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { SearchIcon } from "lucide-react";
import { useDriveItemSearch } from "@/hooks/useDriveItemSearch";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { result, setQuery } = useDriveItemSearch();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={
          "p-0 border-none md:border relative h-8 justify-start rounded-lg md:bg-muted/50 text-sm font-normal text-muted-foreground shadow-none md:w-48 lg:w-64 md:border-solid"
        }
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="size-4 mx-2" />
        <span className="hidden md:inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0">
          <DialogTitle className="pt-3 pl-3 hidden">Search...</DialogTitle>
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
            <CommandInput
              placeholder="Search for items..."
              onValueChange={setQuery}
            />
            <CommandList>
              <CommandGroup heading="Search result:">
                {result.map((item: any, i) => (
                  <CommandItem
                    key={`search-${i + 1}`}
                    className="block"
                    value={item.name}
                    onSelect={() => setOpen(false)}
                  >
                    <Link href={item.path}>
                      <p>{item.name}</p>
                      <p className="text-muted-foreground">{item.path}</p>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
