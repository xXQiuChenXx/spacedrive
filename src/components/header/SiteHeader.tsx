import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { IconWhirl } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { CommandPalette } from "./CommandPalette";
import { siteConfig } from "@/config/site.config";
import { UserButton } from "./UserButton";

type UserData = { isAdmin: boolean; path: string[] };
export function SiteHeader({
  user,
  showNav,
}: {
  user?: UserData;
  showNav?: boolean;
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow">
      <div className="px-5 md:container flex h-14 items-center">
        <Link href="/" className="mr-2 flex items-center md:mr-6 md:space-x-2">
          <IconWhirl width={25} height={25} aria-hidden="true" />
          <span className="font-bold whitespace-nowrap">
            {siteConfig.siteTitle}
          </span>
        </Link>
        {showNav && (
          <nav className="flex w-full items-center gap-6 text-sm">
            <Link
              href="/home"
              className="hidden md:inline-block text-foreground/60 transition-colors hover:text-foreground"
            >
              Home
            </Link>
          </nav>
        )}
        <nav className="flex flex-1 items-center md:justify-end gap-2">
          <CommandPalette />
          <Button variant="ghost" size="icon" className="size-8" asChild>
            <Link
              aria-label="GitHub repo"
              href="https://github.com/xXQiuChenXx/onedrive-index"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubLogoIcon className="size-5" aria-hidden="true" />
            </Link>
          </Button>
          <ThemeToggle />
          {user && <UserButton user={user} />}
        </nav>
      </div>
    </header>
  );
}
