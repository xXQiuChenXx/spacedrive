import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { SiteHeader } from "@/components/header/SiteHeader";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site.config";
import Footer from "@/components/Footer";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Theme className="min-h-screen flex flex-col">
            <NextTopLoader
              height={2}
              color="rgb(156, 163, 175, 0.9)"
              showSpinner={false}
            />
            <SiteHeader />
            {children}
            <Footer />
          </Theme>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
