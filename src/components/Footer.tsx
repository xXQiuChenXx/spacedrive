import Link from "next/link";
import { siteConfig } from "@/config/site.config";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 w-full border-t shadow justify-center items-center mt-auto py-4">
      <p className="text-sm font-semibold">{siteConfig.siteTitle}</p>
      <p className="text-xs">
        Built with {" "}
        <Link
          href="https://github.com/xXQiuChenXx/spacedrive"
          rel="noreferrer noopener"
          target="_blank"
          className="font-medium"
        >
          Space Drive
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
