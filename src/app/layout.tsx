import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "@/components/root/ThemeProvider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site.config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.siteTitle,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Theme className="min-h-screen flex flex-col">
            <NextTopLoader
              height={2}
              color="rgb(156, 163, 175, 0.9)"
              showSpinner={false}
            />
            {children}
          </Theme>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
