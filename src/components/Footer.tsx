import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 w-full border-t shadow justify-center items-center mt-auto py-4">
      <p className="text-sm font-semibold">Space Drive</p>
      <p className="text-xs">
        Built with ❤️ by {" "}
        <Link
          href="https://personal.myitscm.com"
          rel="noreferrer noopener"
          target="_blank"
          className="font-medium"
        >
          Tai Hong
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
